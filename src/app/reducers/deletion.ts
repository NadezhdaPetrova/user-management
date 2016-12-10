import * as deletionActions from 'actions/deletion';
import * as toastActions from 'actions/toast';
import * as usersActions from 'actions/users';

export interface State {
    isInProgress?: boolean;
    isSuccessful?: boolean;
    hasError?: boolean;
    error?: string;
};

const initialState: State = {
    isInProgress: false,
    isSuccessful: false,
    hasError: false,
    error: null
};

export function reducer(
        state: State = initialState,
        action: deletionActions.Actions | toastActions.Actions | usersActions.Actions
    ): State {
    switch (action.type) {
        case deletionActions.ActionTypes.DELETE: {
            const newState: State = {
               isInProgress: true
            };

            return Object.assign({}, state, newState);
        }
        case deletionActions.ActionTypes.DELETE_SUCCESS: {
            const newState: State = {
                isInProgress: false,
                isSuccessful: true
            };

            return Object.assign({}, state, newState);
        }
        case deletionActions.ActionTypes.DELETE_FAIL: {
            const newState: State = {
                isInProgress: false,
                hasError: true,
                error: action.payload
            };

            return Object.assign({}, state, newState);
        }
        case toastActions.ActionTypes.HIDE_TOAST_MESSAGE: {
            const newState: State = {
                hasError: false,
                error: null
            };

            return Object.assign({}, state, newState);
        }
        case usersActions.ActionTypes.LOAD: {
            const newState: State = {
                isSuccessful: false
            };

            return Object.assign({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export const getIsInProgress = (state: State) => state.isInProgress;
export const getIsSuccessful = (state: State) => state.isSuccessful;
export const getHasError = (state: State) => state.hasError;
export const getError = (state: State) => state.error;
