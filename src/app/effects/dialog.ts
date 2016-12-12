import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as dialogActions from 'actions/dialog';
import { User } from 'modules/users/models';
import { UserService} from 'modules/users/services/user.service';

@Injectable()
export class DialogEffects {
    @Effect()
    loadUser$: Observable<Action> = this.actions$
    .ofType(dialogActions.ActionTypes.LOAD_USER)
    .map((action: dialogActions.LoadUserAction) => action.payload)
    .switchMap((id: number) => {
        return this.userService.getUser(id)
            .map((user: User) => new dialogActions.LoadUserSuccessAction(user))
            .catch((error: string) => of(new dialogActions.LoadUserFailAction(error)));
    });

    @Effect()
    createUser$: Observable<Action> = this.actions$
    .ofType(dialogActions.ActionTypes.CREATE)
    .map((action: dialogActions.CreateAction) => action.payload)
    .switchMap((user: User) => {
        return this.userService.createUser(user)
            .map((createdUser: User) => new dialogActions.SaveSuccessAction(createdUser))
            .catch((error: string) => of(new dialogActions.SaveFailAction(error)));
    });

    @Effect()
    updateUser$: Observable<Action> = this.actions$
    .ofType(dialogActions.ActionTypes.UPDATE)
    .map((action: dialogActions.UpdateAction) => action.payload)
    .switchMap((user: User) => {
        return this.userService.updateUser(user)
            .map((updatedUser: User) => new dialogActions.SaveSuccessAction(updatedUser))
            .catch((error: string) => of(new dialogActions.SaveFailAction(error)));
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
