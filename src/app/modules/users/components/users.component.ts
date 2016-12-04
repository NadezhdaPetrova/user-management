import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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

  constructor(private store: Store<fromRoot.State>) {
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
}
