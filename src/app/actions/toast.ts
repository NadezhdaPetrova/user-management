import { Action } from '@ngrx/store';

import { ToastConfig } from 'modules/shared/components/toast/toast.config';
import { type } from 'utils';

export const ActionTypes = {
    SHOW_TOAST_MESSAGE: type('[User] Show Toast Message'),
    HIDE_TOAST_MESSAGE: type('[User] Hide Toast Message')
};

export class ShowToastMessageAction implements Action {
    type = ActionTypes.SHOW_TOAST_MESSAGE;

    constructor(public payload: ToastConfig) { }
}

export class HideToastMessageAction implements Action {
    type = ActionTypes.HIDE_TOAST_MESSAGE;
}

export type Actions = ShowToastMessageAction
                    | HideToastMessageAction;
