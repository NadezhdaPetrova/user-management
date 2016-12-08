import { Action } from '@ngrx/store';

import { User, UsersInfo, PageInfo } from '../modules/users/models';
import { type } from '../utils';

// TODO: extract actions nad reducers in separate files

export const ActionTypes = {
    LOAD: type('[Users] Load users'),
    LOAD_SUCCESS: type('[Users] Load Success'),
    LOAD_FAIL: type('[Users] Load Fail'),
    CREATE: type('[User] Create'),
    CREATE_SUCCESS: type('[User] Create Seccess'),
    CREATE_FAIL: type('[User] Create Fail'),
    SHOW_SUCCESS_MESSAGE: type('[User] Show Success Message'),
    HIDE_SUCCESS_MESSAGE: type('[User] Hide Success Message'),
};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: PageInfo) { }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: UsersInfo) { }
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

export class ShowSuccessMessageAction implements Action {
    type = ActionTypes.SHOW_SUCCESS_MESSAGE;
}

export class HideSuccessMessageAction implements Action {
    type = ActionTypes.HIDE_SUCCESS_MESSAGE;
}

export type Actions = LoadAction
                    | LoadSuccessAction
                    | LoadFailAction
                    | CreateAction
                    | CreateSuccessAction
                    | CreateFailAction
                    | ShowSuccessMessageAction
                    | HideSuccessMessageAction;
