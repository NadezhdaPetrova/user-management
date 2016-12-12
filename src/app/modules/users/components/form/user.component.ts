import { Component, Output, ChangeDetectionStrategy, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { User, PageInfo } from 'modules/users/models';
import { ToastConfig } from 'modules/shared/components/toast/toast.config';

import * as dialogActions from 'actions/dialog';
import * as usersActions from 'actions/users';
import * as toastActions from 'actions/toast';
import * as fromRoot from 'reducers';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    user$: Observable<User>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;
    error$: Observable<string>;

    private subscriptions: Array<Subscription> = new Array<Subscription>();

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.user$ = this.store.select(fromRoot.getDialogUser);
        this.isLoading$ = this.store.select(fromRoot.getDialogIsLoading);
        this.hasError$ = this.store.select(fromRoot.getDialogHasError);
        this.error$ = this.store.select(fromRoot.getDialogError);

        this.subscribeForUserSavedData();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    save(user: User) {
        this.store.dispatch(new dialogActions.CreateAction(user));
    }

    private subscribeForUserSavedData() {
        const pageInfo$ = this.store.select(fromRoot.getUsersPageInfo);
        const isUserSaved$ = this.store.select(fromRoot.getDialogIsUserSaved);

        const savedUserInfo$ = Observable.combineLatest(pageInfo$, isUserSaved$,
            (pageInfo: PageInfo, isUserSaved: boolean) => {
                return {
                    pageInfo: pageInfo,
                    isUserSaved: isUserSaved
                };
            });

        const subscription = savedUserInfo$.subscribe(data => {
            if (data.isUserSaved) {
                this.store.dispatch(new usersActions.LoadAction(data.pageInfo));
                const toastConfig = new ToastConfig('User has been successfully saved!', 'success');
                this.store.dispatch(new toastActions.ShowToastMessageAction(toastConfig));

                this.close.emit();
            }
        });

        this.subscriptions.push(subscription);
    }
}
