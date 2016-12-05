import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import * as userActions from '../../../actions/user';
import * as fromRoot from '../../../reducers';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
    user$: Observable<User>;
    userExists$: Observable<boolean>;
    loading$: Observable<boolean>;
    hasError$: Observable<boolean>;
    error$: Observable<string>;

    constructor(private store: Store<fromRoot.State>, public dialogRef: MdDialogRef<UserComponent>) {
        this.user$ = this.store.select(fromRoot.getUser);
        this.userExists$ = this.user$.map(user => user.id ? true : false);
        this.loading$ = this.store.select(fromRoot.getUserDialogLoading);
        this.hasError$ = this.store.select(fromRoot.getUserDialogHasError);
        this.error$ = this.store.select(fromRoot.getUserDialogError);

        const userSaved$ = this.store.select(fromRoot.getUserDialogUserSaved);
        userSaved$.subscribe(isSaved => {
            if (isSaved) {
                this.store.dispatch(new userActions.LoadAction());
                this.store.dispatch(new userActions.ShowSuccessMessageAction());
                setTimeout(() => this.store.dispatch(new userActions.HideSuccessMessageAction()), 5000);

                this.dialogRef.close();
            }
        });
    }

    save(user: User) {
        this.store.dispatch(new userActions.CreateAction(user));
    }

    cancel() {
        this.dialogRef.close();
    }
}
