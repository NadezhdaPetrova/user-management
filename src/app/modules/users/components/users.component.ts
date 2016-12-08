import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { UserComponent } from './user.component';

import { User, SortDescriptor, SortDirection, PageInfo } from '../models';
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
  showSuccessMessage$: Observable<boolean>;
  totalUsers$: Observable<number>;
  usersPerPage$: Observable<number>;
  currentPage$: Observable<number>;
  showNavigation$: Observable<boolean>;

  private pageInfo: PageInfo;

  private pageInfoSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private dialog: MdDialog) {
    this.users$ = this.store.select(fromRoot.getUserCollection);
    this.isLoading$ = this.store.select(fromRoot.getUserIsLoading);
    this.hasError$ = this.store.select(fromRoot.getUserHasError);
    this.error$ = this.store.select(fromRoot.getUserError);
    this.showSuccessMessage$ = this.store.select(fromRoot.getUserShowSuccessMessage);

    this.totalUsers$ = this.store.select(fromRoot.getTotalUsers);
    this.usersPerPage$ = this.store.select(fromRoot.getUsersPerPage);
    this.currentPage$ = this.store.select(fromRoot.getUsersCurrentPage);

    this.showNavigation$ = Observable.combineLatest(this.totalUsers$, this.usersPerPage$,
      (totalUsers, usersPerPage) => totalUsers > usersPerPage);

    const pageInfo$ = this.store.select(fromRoot.getUsersPageInfo);
    this.pageInfoSubscription = pageInfo$.subscribe(pageInfo => this.pageInfo = pageInfo);
  }

  ngOnInit() {
    this.store.dispatch(new user.LoadAction(this.pageInfo));
  }

  ngOnDestroy() {
    if (this.pageInfoSubscription) {
      this.pageInfoSubscription.unsubscribe();
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

  pageChanged(nextPage) {
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
