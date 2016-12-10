import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as toastActions from 'actions/toast';
import { UserService} from 'modules/users/services/user.service';

@Injectable()
export class ToastEffects {
    @Effect()
    showToastMessage$: Observable<Action> = this.actions$
    .ofType(toastActions.ActionTypes.SHOW_TOAST_MESSAGE)
    .switchMap(() => {
        return of(new toastActions.HideToastMessageAction())
            .delay(5000);
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
