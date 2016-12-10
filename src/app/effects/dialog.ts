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
    createUser$: Observable<Action> = this.actions$
    .ofType(dialogActions.ActionTypes.CREATE)
    .map((action: dialogActions.CreateAction) => action.payload)
    .switchMap((user: User) => {
        return this.userService.createUser(user)
            .map((createdUser: User) => new dialogActions.CreateSuccessAction(createdUser))
            .catch((error: string) => of(new dialogActions.CreateFailAction(error)));
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
