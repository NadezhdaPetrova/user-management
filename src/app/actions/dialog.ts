import { Action } from '@ngrx/store';

import { User } from 'modules/users/models';
import { type } from 'utils';

export const ActionTypes = {
    LOAD_USER: type('[User] Load User'),
    LOAD_USER_SUCCESS: type('[User] Load User Success'),
    LOAD_USER_FAIL: type('[User] Load User Fail'),
    CREATE: type('[User] Create'),
    UPDATE: type('[User] Update'),
    SAVE_SUCCESS: type('[User] Create Success'),
    SAVE_FAIL: type('[User] Create Fail'),
    DISCARD: type('[User] Discard')
};

export class LoadUserAction implements Action {
    type = ActionTypes.LOAD_USER;

    constructor(public payload: number) { }
}

export class LoadUserSuccessAction implements Action {
    type = ActionTypes.LOAD_USER_SUCCESS;

    constructor(public payload: User) { }
}

export class LoadUserFailAction implements Action {
    type = ActionTypes.LOAD_USER_FAIL;

    constructor(public payload: string) { }
}

export class CreateAction implements Action {
    type = ActionTypes.CREATE;

    constructor(public payload: User) { }
}

export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: User) { }
}

export class SaveSuccessAction implements Action {
    type = ActionTypes.SAVE_SUCCESS;

    constructor(public payload: User) { }
}

export class SaveFailAction implements Action {
    type = ActionTypes.SAVE_FAIL;

    constructor(public payload: string) { }
}

export class DiscardAction implements Action {
    type = ActionTypes.DISCARD;
}

export type Actions = LoadUserAction
                    | LoadUserSuccessAction
                    | LoadUserFailAction
                    | CreateAction
                    | UpdateAction
                    | SaveSuccessAction
                    | SaveFailAction
                    | DiscardAction;
