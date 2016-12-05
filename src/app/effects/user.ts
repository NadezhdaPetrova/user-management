import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as userActions from '../actions/user';
import { User } from '../modules/users/models';
import { UserService } from '../modules/users/services/user.service';

@Injectable()
export class UserEffects {
    @Effect()
    loadUsers$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.LOAD)
    .switchMap(() => {
        return this.userService.getUsers()
            .map((users: Array<User>) => new userActions.LoadSuccessAction(users))
            .catch(error => of(new userActions.LoadFailAction(error)));
    });

    @Effect()
    createUser$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.CREATE)
    .map((action: userActions.CreateAction) => action.payload)
    .switchMap((user: User) => {
        return this.userService.createUser(user)
            .map((createdUser: User) => new userActions.CreateSuccessAction(createdUser))
            .catch(error => of(new userActions.CreateFailAction(error)));
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
