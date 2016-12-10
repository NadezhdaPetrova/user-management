import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as usersActions from 'actions/users';
import { UsersInfo, PageInfo } from 'modules/users/models';
import { UserService } from 'modules/users/services/user.service';

@Injectable()
export class UsersEffects {
    @Effect()
    loadUsers$: Observable<Action> = this.actions$
    .ofType(usersActions.ActionTypes.LOAD)
    .map((action: usersActions.LoadAction) => action.payload)
    .switchMap((pageInfo: PageInfo) => {
        return this.userService.getUsers(pageInfo)
            .map((usersInfo: UsersInfo) => new usersActions.LoadSuccessAction(usersInfo))
            .catch((error: string) => of(new usersActions.LoadFailAction(error)));
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
