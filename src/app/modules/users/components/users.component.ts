import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserComponent } from './user.component';

import { User } from '../models';
import * as fromRoot from '../../../reducers';
import * as user from '../../../actions/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$: Observable<Array<User>>;
  isLoading$: Observable<boolean>;
  hasError$: Observable<boolean>;
  error$: Observable<string>;
  showGrid$: Observable<boolean>;
  showSuccessMessage$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private dialog: MdDialog) {
    this.users$ = this.store.select(fromRoot.getUserCollection);
    this.isLoading$ = this.store.select(fromRoot.getUserIsLoading);
    this.hasError$ = this.store.select(fromRoot.getUserHasError);
    this.error$ = this.store.select(fromRoot.getUserError);
    this.showSuccessMessage$ = this.store.select(fromRoot.getUserShowSuccessMessage);
    this.showGrid$ = Observable.combineLatest(this.isLoading$, this.hasError$,
                                (isLoading, hasError) => !isLoading && !hasError);
  }

  ngOnInit() {
    this.store.dispatch(new user.LoadAction());
  }

  create() {
    this.dialog.open(UserComponent, {
      disableClose: true
    });
  }
}
