import { User } from '../modules/users/models';
import * as user from '../actions/user';

export interface State {
    collection: Array<User>;
    isLoading: boolean;
    hasError: boolean;
    error: string;
}

const initialState: State = {
    collection: [],
    isLoading: true,
    hasError: false,
    error: null
};

export function reducer(state: State = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ActionTypes.LOAD: {
            return Object.assign({}, state, { isLoading: true });
        }
        case user.ActionTypes.LOAD_SUCCESS: {
            return {
                collection: action.payload,
                isLoading: false,
                hasError: false,
                error: null
            };
        }
        case user.ActionTypes.LOAD_FAIL: {
            return {
                collection: state.collection,
                isLoading: false,
                hasError: true,
                error: action.payload
            };
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
