import { User } from '../modules/users/models';
import * as user from '../actions/user';

export interface State {
    collection: Array<User>;
    isLoading: boolean;
    hasError: boolean;
    error: string;
    user: User;
    dialogLoading: boolean;
    dialogSaved: boolean;
    dialogHasError: boolean;
    dialogError: string;
}

const initialState: State = {
    collection: [],
    isLoading: true,
    hasError: false,
    error: null,
    user: new User(),
    dialogLoading: false,
    dialogSaved: false,
    dialogHasError: false,
    dialogError: null
};

export function reducer(state: State = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                isLoading: true,
                dialogSaved: false,
                user: new User()
            });
        }
        case user.ActionTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                collection: action.payload,
                isLoading: false
            });
        }
        case user.ActionTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                isLoading: false,
                hasError: true,
                error: action.payload
            });
        }
        case user.ActionTypes.CREATE: {
            return Object.assign({}, state, {
               dialogLoading: true
            });
        }
        case user.ActionTypes.CREATE_SUCCESS: {
            return Object.assign({}, state, {
                dialogLoading: false,
                dialogSaved: true,
                user: action.payload
            });
        }
        case user.ActionTypes.CREATE_FAIL: {
            return Object.assign({}, state, {
                dialogLoading: false,
                dialogHasError: true,
                dialogError: action.payload
            });
        }
        default: {
            return state;
        }
    }
}

export const getCollection = (state: State) => state.collection;
export const getIsLoading = (state: State) => state.isLoading;
export const getHasError = (state: State) => state.hasError;
export const getError = (state: State) => state.error;
export const getUser = (state: State) => state.user;
export const getDialogLoading = (state: State) => state.dialogLoading;
export const getDialogSaved = (state: State) => state.dialogSaved;
export const getDialogHasError = (state: State) => state.dialogHasError;
export const getDialogError = (state: State) => state.dialogError;
