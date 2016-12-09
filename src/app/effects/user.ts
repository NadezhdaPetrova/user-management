import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as userActions from 'actions/user';
import { User, UsersInfo, PageInfo } from 'modules/users/models';
import { UserService } from 'modules/users/services/user.service';

@Injectable()
export class UserEffects {
    @Effect()
    loadUsers$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.LOAD)
    .map((action: userActions.LoadAction) => action.payload)
    .switchMap((pageInfo: PageInfo) => {
        return this.userService.getUsers(pageInfo)
            .map((usersInfo: UsersInfo) => new userActions.LoadSuccessAction(usersInfo))
            .catch((error: string) => of(new userActions.LoadFailAction(error)));
    });

    @Effect()
    createUser$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.CREATE)
    .map((action: userActions.CreateAction) => action.payload)
    .switchMap((user: User) => {
        return this.userService.createUser(user)
            .map((createdUser: User) => new userActions.CreateSuccessAction(createdUser))
            .catch((error: string) => of(new userActions.CreateFailAction(error)));
    });

    @Effect()
    deleteUser$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.DELETE)
    .map((action: userActions.DeleteAction) => action.payload)
    .switchMap((id: number) => {
        return this.userService.deleteUser(id)
            .map(() => new userActions.DeleteSuccessAction())
            .catch((error: string) => of(new userActions.DeleteFailAction(error)));
    });

    @Effect()
    showToastMessage$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.SHOW_TOAST_MESSAGE)
    .switchMap(() => {
        return of(new userActions.HideToastMessageAction())
            .delay(5000);
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
