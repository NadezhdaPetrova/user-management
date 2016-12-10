import { Action } from '@ngrx/store';

import { UsersInfo, PageInfo } from 'modules/users/models';
import { type } from 'utils';

export const ActionTypes = {
    LOAD: type('[Users] Load users'),
    LOAD_SUCCESS: type('[Users] Load Success'),
    LOAD_FAIL: type('[Users] Load Fail')
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

export type Actions = LoadAction
                    | LoadSuccessAction
                    | LoadFailAction;
