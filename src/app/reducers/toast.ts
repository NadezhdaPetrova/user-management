import * as toastActions from 'actions/toast';

export interface State {
    showMessage: boolean;
    message: string;
    type: 'success' | 'danger';
}

const initialState: State = {
    showMessage: false,
    message: null,
    type: null
};

export function reducer(state: State = initialState, action: toastActions.Actions): State {
    switch (action.type) {
        case toastActions.ActionTypes.SHOW_TOAST_MESSAGE: {
            const newState: State = {
                showMessage: true,
                message: action.payload.message,
                type: action.payload.type
            };

            return Object.assign({}, state, newState);
        }
        case toastActions.ActionTypes.HIDE_TOAST_MESSAGE: {
            const newState: State = {
                showMessage: false,
                message: null,
                type: null
            };

            return Object.assign({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export const getShowMessage = (state: State) => state.showMessage;
export const getMessage = (state: State) => state.message;
export const getType = (state: State) => state.type;
