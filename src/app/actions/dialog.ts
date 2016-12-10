import { Action } from '@ngrx/store';

import { User } from 'modules/users/models';
import { type } from 'utils';

export const ActionTypes = {
    CREATE: type('[User] Create'),
    CREATE_SUCCESS: type('[User] Create Seccess'),
    CREATE_FAIL: type('[User] Create Fail')
};

export class CreateAction implements Action {
    type = ActionTypes.CREATE;

    constructor(public payload: User) { }
}

export class CreateSuccessAction implements Action {
    type = ActionTypes.CREATE_SUCCESS;

    constructor(public payload: User) { }
}

export class CreateFailAction implements Action {
    type = ActionTypes.CREATE_FAIL;

    constructor(public payload: string) { }
}

export type Actions = CreateAction
                    | CreateSuccessAction
                    | CreateFailAction;
