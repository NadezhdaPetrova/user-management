import { Action } from '@ngrx/store';

import { User, UsersInfo, PageInfo } from 'modules/users/models';
import { ToastConfig } from 'modules/shared/components/toast/toast.config';
import { type } from 'utils';

// TODO: extract actions nad reducers in separate files

export const ActionTypes = {
    LOAD: type('[Users] Load users'),
    LOAD_SUCCESS: type('[Users] Load Success'),
    LOAD_FAIL: type('[Users] Load Fail'),
    CREATE: type('[User] Create'),
    CREATE_SUCCESS: type('[User] Create Seccess'),
    CREATE_FAIL: type('[User] Create Fail'),
    SHOW_TOAST_MESSAGE: type('[User] Show Toast Message'),
    HIDE_TOAST_MESSAGE: type('[User] Hide Toast Message'),
    DELETE: type('[User] Delete'),
    DELETE_SUCCESS: type('[User] Delete Success'),
    DELETE_FAIL: type('[User] Delete Fail')
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

export class ShowToastMessageAction implements Action {
    type = ActionTypes.SHOW_TOAST_MESSAGE;

    constructor(public payload: ToastConfig) { }
}

export class HideToastMessageAction implements Action {
    type = ActionTypes.HIDE_TOAST_MESSAGE;
}

export class DeleteAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: number) { }
}

export class DeleteSuccessAction implements Action {
    type = ActionTypes.DELETE_SUCCESS;
}

export class DeleteFailAction implements Action {
    type = ActionTypes.DELETE_FAIL;

    constructor(public payload: string) { }
}

export type Actions = LoadAction
                    | LoadSuccessAction
                    | LoadFailAction
                    | CreateAction
                    | CreateSuccessAction
                    | CreateFailAction
                    | ShowToastMessageAction
                    | HideToastMessageAction
                    | DeleteAction
                    | DeleteSuccessAction
                    | DeleteFailAction;
