import { User } from 'modules/users/models';
import * as dialogActions from 'actions/dialog';
import * as usersActions from 'actions/users';

export interface State {
    user: User;
    isLoading: boolean;
    isUserSaved: boolean;
    hasError: boolean;
    error: string;
}

const initialState: State = {
    user: new User(),
    isLoading: false,
    isUserSaved: false,
    hasError: false,
    error: null
};

export function reducer(state: State = initialState, action: dialogActions.Actions | usersActions.Actions): State {
    switch (action.type) {
        case dialogActions.ActionTypes.CREATE: {
            const newState = {
                isLoading: true
            };

            return Object.assign({}, state, newState);
        }
        case dialogActions.ActionTypes.CREATE_SUCCESS: {
            const newState = {
                isLoading: false,
                isUserSaved: true
                // user: action.payload
            };

            return Object.assign({}, state, newState);
        }
        case dialogActions.ActionTypes.CREATE_FAIL: {
            const newState = {
                isLoading: false,
                hasError: true,
                error: action.payload
            };

            return Object.assign({}, state, newState);
        }
        case usersActions.ActionTypes.LOAD: {
            const newState = {
                isUserSaved: false
            };

            return Object.assign({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export const getUser = (state: State) => state.user;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsUserSaved = (state: State) => state.isUserSaved;
export const getHasError = (state: State) => state.hasError;
export const getError = (state: State) => state.error;

