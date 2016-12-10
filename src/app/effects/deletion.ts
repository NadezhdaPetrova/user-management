import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as deletionActions from 'actions/deletion';
import { UserService} from 'modules/users/services/user.service';

@Injectable()
export class DeletionEffects {
    @Effect()
    deleteUser$: Observable<Action> = this.actions$
    .ofType(deletionActions.ActionTypes.DELETE)
    .map((action: deletionActions.DeleteAction) => action.payload)
    .switchMap((id: number) => {
        return this.userService.deleteUser(id)
            .map(() => new deletionActions.DeleteSuccessAction())
            .catch((error: string) => of(new deletionActions.DeleteFailAction(error)));
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
