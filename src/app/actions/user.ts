import { Action } from '@ngrx/store';

import { User } from '../modules/users/models';
import { type } from '../utils';

export const ActionTypes = {
    LOAD: type('[Users] Load users'),
    LOAD_SUCCESS: type('[Users] Load Success'),
    LOAD_FAIL: type('[Users] Load Fail'),
    CREATE: type('[User] Create'),
    CREATE_SUCCESS: type('[User] Create Seccess'),
    CREATE_FAIL: type('[User] Create Fail')
};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Array<User>) { }
}

export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: any) { }
}

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

export type Actions = LoadAction
                    | LoadSuccessAction
                    | LoadFailAction
                    | CreateAction
                    | CreateSuccessAction
                    | CreateFailAction;
