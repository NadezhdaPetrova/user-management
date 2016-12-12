import { Action } from '@ngrx/store';

import { UsersInfo, PageInfo } from 'modules/users/models';
import { type } from 'utils';

export const ActionTypes = {
    LOAD: type('[Users] Load Users'),
    LOAD_SUCCESS: type('[Users] Load Users Success'),
    LOAD_FAIL: type('[Users] Load Users Fail')
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
