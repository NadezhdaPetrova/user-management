import { Action } from '@ngrx/store';

import { type } from 'utils';

export const ActionTypes = {
    DELETE: type('[User] Delete'),
    DELETE_SUCCESS: type('[User] Delete Success'),
    DELETE_FAIL: type('[User] Delete Fail')
};

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

export type Actions = DeleteAction
                    | DeleteSuccessAction
                    | DeleteFailAction;
