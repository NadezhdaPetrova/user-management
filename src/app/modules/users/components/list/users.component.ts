import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { User, SortDescriptor, SortDirection, PageInfo } from 'modules/users/models';
import { ToastConfig } from 'modules/shared/components/toast/toast.config';

import * as usersActions from 'actions/users';
import * as toastActions from 'actions/toast';
import * as deletionActions from 'actions/deletion';
import * as fromRoot from 'reducers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(ModalDirective) dialog: ModalDirective;
  showDialog: boolean;

  users$: Observable<Array<User>>;
  isLoading$: Observable<boolean>;
  hasError$: Observable<boolean>;
  error$: Observable<string>;

  disableGrid$: Observable<boolean>;

  private pageInfo: PageInfo;

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private store: Store<fromRoot.State>, @Inject('Window') private window: any) { }

  ngOnInit() {
    this.subscribeForUsersData();
    this.subscribeForDeletionData();

    const isDeletionInProgress$ = this.store.select(fromRoot.getDeletionIsInProgress);
    this.disableGrid$ = Observable.combineLatest(isDeletionInProgress$, this.isLoading$,
      (isDeletionInProgress: boolean, isLoading: boolean) => isDeletionInProgress || isLoading);

    this.store.dispatch(new usersActions.LoadAction(this.pageInfo));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  create() {
    this.showDialog = true;
    this.dialog.show();
  }

  sort(property) {
    const newSortDescriptor = this.generateSortDescriptor(property);
    const newPageInfo = Object.assign({}, this.pageInfo, { sort: newSortDescriptor });
    this.store.dispatch(new usersActions.LoadAction(newPageInfo));
  }

  delete(id: number) {
    this.store.dispatch(new deletionActions.DeleteAction(id));
  }

  pageChanged(nextPage) {
    this.window.scrollTo(0, 0);

    const nextPageInfo: PageInfo = Object.assign({}, this.pageInfo, { page: nextPage.page });
    this.store.dispatch(new usersActions.LoadAction(nextPageInfo));
  }

  private subscribeForUsersData() {
    this.users$ = this.store.select(fromRoot.getUsersCollection);
    this.isLoading$ = this.store.select(fromRoot.getUsersIsLoading);
    this.hasError$ = this.store.select(fromRoot.getUsersHasError);
    this.error$ = this.store.select(fromRoot.getUsersError);

    const pageInfo$ = this.store.select(fromRoot.getUsersPageInfo);
    const subscription = pageInfo$.subscribe(pageInfo => this.pageInfo = pageInfo);
    this.subscriptions.push(subscription);
  }

  private subscribeForDeletionData() {
    this.subscribeForSuccessfulDeletion();
    this.subscribeForFailedDeletion();
  }

  private subscribeForSuccessfulDeletion() {
    const isDeletionSuccessful$ = this.store.select(fromRoot.getDeletionIsSuccessful);
    const subscription = isDeletionSuccessful$.subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.store.dispatch(new usersActions.LoadAction(this.pageInfo));
        const toastConfig = new ToastConfig('User has been successfully deleted!', 'success');
        this.store.dispatch(new toastActions.ShowToastMessageAction(toastConfig));
      }
    });

    this.subscriptions.push(subscription);
  }

  private subscribeForFailedDeletion() {
    const deletionError$ = this.store.select(fromRoot.getDeletionError);
    const deletionHasError$ = this.store.select(fromRoot.getDeletionHasError);

    const showDeletionError$ = Observable.combineLatest(deletionHasError$, deletionError$,
      (deletionHasError: boolean, deletionError: string) => {
        return { hasError: deletionHasError, error: deletionError};
      });
    const subscription = showDeletionError$.subscribe(data => {
      if (data.hasError && data.error) {
        const errorMessage = `Something went wrong while deleting the user! Error: ${data.error}`;
        const toastConfig = new ToastConfig(errorMessage, 'danger');
        this.store.dispatch(new toastActions.ShowToastMessageAction(toastConfig));
      }
    });

    this.subscriptions.push(subscription);
  }

  private generateSortDescriptor(property): SortDescriptor {
    let newSortDirection: SortDirection;

    if (property === this.pageInfo.sort.property) {
      newSortDirection = this.pageInfo.sort.direction === SortDirection.Ascending ?
                            SortDirection.Descending : SortDirection.Ascending;
    } else {
        newSortDirection = SortDirection.Ascending;
    }

    const newSortDescriptor: SortDescriptor = {
      property: property,
      direction: newSortDirection
    };

    return newSortDescriptor;
  }
}
