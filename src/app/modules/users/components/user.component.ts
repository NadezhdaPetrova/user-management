import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { User, PageInfo } from '../models';
import { ToastConfig } from '../../shared/components/toast/toast.config';
import * as userActions from '../../../actions/user';
import * as fromRoot from '../../../reducers';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnDestroy {
    user$: Observable<User>;
    userExists$: Observable<boolean>;
    loading$: Observable<boolean>;
    hasError$: Observable<boolean>;
    error$: Observable<string>;

    private pageInfo: PageInfo;

    private userSavedSubscription: Subscription;
    private pageInfoSubscription: Subscription;

    constructor(private store: Store<fromRoot.State>, public dialogRef: MdDialogRef<UserComponent>) {
        this.user$ = this.store.select(fromRoot.getUser);
        this.userExists$ = this.user$.map(user => user.id ? true : false);
        this.loading$ = this.store.select(fromRoot.getUserDialogLoading);
        this.hasError$ = this.store.select(fromRoot.getUserDialogHasError);
        this.error$ = this.store.select(fromRoot.getUserDialogError);

        const pageInfo$ = this.store.select(fromRoot.getUsersPageInfo);
        this.pageInfoSubscription = pageInfo$.subscribe((pageInfo: PageInfo) => this.pageInfo = pageInfo);

        const userSaved$ = this.store.select(fromRoot.getUserDialogUserSaved);
        this.userSavedSubscription = userSaved$.subscribe(isSaved => {
            if (isSaved) {
                this.store.dispatch(new userActions.LoadAction(this.pageInfo));
                const toastConfig = new ToastConfig('User has been successfully saved!', 'success');
                this.store.dispatch(new userActions.ShowToastMessageAction(toastConfig));

                this.dialogRef.close();
            }
        });
    }

    ngOnDestroy() {
        if (this.userSavedSubscription) {
            this.userSavedSubscription.unsubscribe();
        }
        if (this.pageInfoSubscription) {
            this.pageInfoSubscription.unsubscribe();
        }
    }

    save(user: User) {
        this.store.dispatch(new userActions.CreateAction(user));
    }

    cancel() {
        this.dialogRef.close();
    }
}
