import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { UserComponent } from './user.component';

import { User, SortDescriptor, SortDirection, PageInfo } from '../models';
import { ToastConfig } from '../../shared/components/toast/toast.config';
import * as fromRoot from '../../../reducers';
import * as user from '../../../actions/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<Array<User>>;
  isLoading$: Observable<boolean>;
  hasError$: Observable<boolean>;
  error$: Observable<string>;
  showToastMessage$: Observable<boolean>;
  toastMessage$: Observable<string>;
  toastType$: Observable<'success' | 'danger'>;
  totalUsers$: Observable<number>;
  usersPerPage$: Observable<number>;
  currentPage$: Observable<number>;
  showNavigation$: Observable<boolean>;

  private pageInfo: PageInfo;

  private pageInfoSubscription: Subscription;
  private deletionSuccessfulSubscription: Subscription;
  private showDeletionErrorSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private dialog: MdDialog,
    @Inject('Window') private window: any
  ) {
    // TODO: Refactor this!!!
    this.users$ = this.store.select(fromRoot.getUserCollection);
    this.isLoading$ = this.store.select(fromRoot.getUserIsLoading);
    this.hasError$ = this.store.select(fromRoot.getUserHasError);
    this.error$ = this.store.select(fromRoot.getUserError);
    this.showToastMessage$ = this.store.select(fromRoot.getUserShowToastMessage);
    this.toastMessage$ = this.store.select(fromRoot.getUserToastMessage);
    this.toastType$ = this.store.select(fromRoot.getUserToastType);

    this.totalUsers$ = this.store.select(fromRoot.getTotalUsers);
    this.usersPerPage$ = this.store.select(fromRoot.getUsersPerPage);
    this.currentPage$ = this.store.select(fromRoot.getUsersCurrentPage);

    this.showNavigation$ = Observable.combineLatest(this.totalUsers$, this.usersPerPage$,
      (totalUsers: number, usersPerPage: number) => totalUsers > usersPerPage);

    const pageInfo$ = this.store.select(fromRoot.getUsersPageInfo);
    this.pageInfoSubscription = pageInfo$.subscribe(pageInfo => this.pageInfo = pageInfo);

    const deletionSuccessful$ = this.store.select(fromRoot.getUsersDeletionSuccessful);
    this.deletionSuccessfulSubscription = deletionSuccessful$.subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.store.dispatch(new user.LoadAction(this.pageInfo));
        const toastConfig = new ToastConfig('User has been successfully deleted!', 'success');
        this.store.dispatch(new user.ShowToastMessageAction(toastConfig));
      }
    });

    const deletionError$ = this.store.select(fromRoot.getUsersDeletionError);
    const deletionHasError$ = this.store.select(fromRoot.getUsersDeletionHasError);
    const showDeletionError$ = Observable.combineLatest(deletionHasError$, deletionError$,
      (deletionHasError: boolean, deletionError: string) => {
        return { hasError: deletionHasError, error: deletionError};
      });
    this.showDeletionErrorSubscription = showDeletionError$.subscribe((data: {hasError: boolean, error: string}) => {
      if (data.hasError) {
        const errorMessage = `Something went wrong while deleting the user! Error: ${data.error}`;
        const toastConfig = new ToastConfig(errorMessage, 'danger');
        this.store.dispatch(new user.ShowToastMessageAction(toastConfig));
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new user.LoadAction(this.pageInfo));
  }

  ngOnDestroy() {
    if (this.pageInfoSubscription) {
      this.pageInfoSubscription.unsubscribe();
    }
    if (this.deletionSuccessfulSubscription) {
      this.deletionSuccessfulSubscription.unsubscribe();
    }
    if (this.showDeletionErrorSubscription) {
      this.showDeletionErrorSubscription.unsubscribe();
    }
  }

  create() {
    this.dialog.open(UserComponent, {
      disableClose: true
    });
  }

  sort(property) {
    const newSortDescriptor = this.generateSortDescriptor(property);
    const newPageInfo = Object.assign({}, this.pageInfo, { sort: newSortDescriptor });
    this.store.dispatch(new user.LoadAction(newPageInfo));
  }

  delete(id: number) {
    this.store.dispatch(new user.DeleteAction(id));
  }

  pageChanged(nextPage) {
    this.window.scrollTo(0, 0);

    const nextPageInfo: PageInfo = Object.assign({}, this.pageInfo, { page: nextPage.page });
    this.store.dispatch(new user.LoadAction(nextPageInfo));
  }

  private generateSortDescriptor(property): SortDescriptor {
    let newSortDirection: SortDirection;

    if (property === this.pageInfo.sort.property) {
      newSortDirection =
          this.pageInfo.sort.direction === SortDirection.Ascending ?
                  SortDirection.Descending : SortDirection.Ascending;
    } else {
        newSortDirection = SortDirection.Ascending;
    }

    let newSortDescriptor: SortDescriptor = {
      property: property,
      direction: newSortDirection
    };

    return newSortDescriptor;
  }
}
