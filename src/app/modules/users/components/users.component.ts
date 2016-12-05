import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
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

  dialogRef: MdDialogRef<UserComponent>;

  constructor(private store: Store<fromRoot.State>, private dialog: MdDialog) {
    this.users$ = store.select(fromRoot.getUserCollection);
    this.isLoading$ = store.select(fromRoot.getUserIsLoading);
    this.hasError$ = store.select(fromRoot.getUserHasError);
    this.error$ = store.select(fromRoot.getUserError);
    this.showGrid$ = Observable.combineLatest(this.isLoading$, this.hasError$,
                                (isLoading, hasError) => !isLoading && !hasError);
  }

  ngOnInit() {
    this.store.dispatch(new user.LoadAction());
  }

  create() {
    this.dialogRef = this.dialog.open(UserComponent, {
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
      // this.dialogRef = null;
    });
  }
}
