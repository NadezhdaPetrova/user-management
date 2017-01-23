import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { User, SortDescriptor, SortDirection, PageInfo } from 'modules/users/models';
import { ToastConfig } from 'modules/shared/components/toast/toast.config';

import { WindowRefService } from 'services/window-ref.service';

import * as usersActions from 'actions/users';
import * as toastActions from 'actions/toast';
import * as deletionActions from 'actions/deletion';
import * as dialogActions from 'actions/dialog';
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

  pageInfo: PageInfo;

  private window: Window;
  private subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(private store: Store<fromRoot.State>, windowRef: WindowRefService) {
    this.window = windowRef.nativeWindow;
  }

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
    this.openDialog();
  }

  sort(property) {
    const newSortDescriptor = this.generateSortDescriptor(property);
    const newPageInfo = Object.assign({}, this.pageInfo, { sort: newSortDescriptor });
    this.store.dispatch(new usersActions.LoadAction(newPageInfo));
  }

  delete(id: number) {
    this.store.dispatch(new deletionActions.DeleteAction(id));
  }

  userSelected(id: number) {
    this.store.dispatch(new dialogActions.LoadUserAction(id));
    this.openDialog();
  }

  pageChanged(nextPage) {
    if (this.pageInfo.page === nextPage) {
      return;
    }

    this.window.scrollTo(0, 0);

    const nextPageInfo: PageInfo = Object.assign({}, this.pageInfo, { page: nextPage });
    this.store.dispatch(new usersActions.LoadAction(nextPageInfo));
  }

  pageSizeChanged(size) {
    const nextPageInfo: PageInfo = Object.assign({}, this.pageInfo, {
      page: 1,
      size: size
    });
    this.store.dispatch(new usersActions.LoadAction(nextPageInfo));
  }

  dialogHidden() {
    this.showDialog = false;
    this.store.dispatch(new dialogActions.DiscardAction());
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
    const deletionInfo$ = Observable.combineLatest(isDeletionSuccessful$, this.users$,
      (isDeleted: boolean, users: Array<User>) => {
        return {
          isDeleted: isDeleted,
          usersCount: users.length
        };
      });

    const subscription = deletionInfo$.subscribe(data => {
      let pageInfo = this.pageInfo;
      if (data.usersCount === 1) {
        const newPage = this.pageInfo.page > 1 ? this.pageInfo.page - 1 : 1;
        pageInfo = Object.assign({}, this.pageInfo, { page: newPage });
      }

      if (data.isDeleted) {
        this.store.dispatch(new usersActions.LoadAction(pageInfo));
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

  private openDialog() {
    this.showDialog = true;
    this.dialog.show();
  }
}
