import { User, PageInfo, SortDirection } from 'modules/users/models';
import { defaultPageNumber, defaultItemsPerPage} from './constants';
import * as usersActions from 'actions/users';

export interface State {
    collection?: Array<User>;
    pageInfo?: PageInfo;
    isLoading?: boolean;
    hasError?: boolean;
    error?: string;
}

const defaultPageInfo: PageInfo = {
    page: defaultPageNumber,
    size: defaultItemsPerPage,
    sort: {
        property: 'firstName',
        direction: SortDirection.Ascending
    }
};

const initialState: State = {
    collection: [],
    pageInfo: defaultPageInfo,
    isLoading: true,
    hasError: false,
    error: null
};

export function reducer(state: State = initialState, action: usersActions.Actions): State {
    switch (action.type) {
        case usersActions.ActionTypes.LOAD: {
            const newState: State = {
                isLoading: true,
                pageInfo: action.payload
            };

            return Object.assign({}, state, newState);
        }
        case usersActions.ActionTypes.LOAD_SUCCESS: {
            const newState: State = {
                collection: action.payload.collection,
                isLoading: false
            };

            return Object.assign({}, state, newState);
        }
        case usersActions.ActionTypes.LOAD_FAIL: {
            const newState: State = {
                isLoading: false,
                hasError: true,
                error: action.payload
            };

            return Object.assign({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export const getCollection = (state: State) => state.collection;
export const getPageInfo = (state: State) => state.pageInfo;
export const getIsLoading = (state: State) => state.isLoading;
export const getHasError = (state: State) => state.hasError;
export const getError = (state: State) => state.error;
