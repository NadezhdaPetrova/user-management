import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as user from '../actions/user';
import { User } from '../modules/users/models';
import { UserService } from '../modules/users/services/user.service';

@Injectable()
export class UserEffects {
    @Effect()
    loadUsers$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOAD)
    .switchMap(() => {
        return this.userService.getUsers()
            .map((users: Array<User>) => new user.LoadSuccessAction(users))
            .catch(error => of(new user.LoadFailAction(error)));
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
