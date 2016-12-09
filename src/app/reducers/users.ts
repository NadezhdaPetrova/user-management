import { User, PageInfo, SortDirection } from '../modules/users/models';
import * as user from '../actions/user';

export interface State {
    collection: Array<User>;
    pageInfo: PageInfo;
    isLoading: boolean;
    hasError: boolean;
    error: string;
    user: User;
    dialogLoading: boolean;
    dialogUserSaved: boolean;
    dialogHasError: boolean;
    dialogError: string;
    showSuccessMessage: boolean;
    totalUsers: number;
    usersPerPage: number;
    currentPage: number;
}

const defaultPageInfo: PageInfo = {
    page: 1,
    size: 20,
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
    error: null,
    user: new User(),
    dialogLoading: false,
    dialogUserSaved: false,
    dialogHasError: false,
    dialogError: null,
    showSuccessMessage: false,
    totalUsers: null,
    usersPerPage: defaultPageInfo.size,
    currentPage: defaultPageInfo.page
};

export function reducer(state: State = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                isLoading: true,
                dialogUserSaved: false,
                pageInfo: action.payload,
                user: new User()
            });
        }
        case user.ActionTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                collection: action.payload.collection,
                totalUsers: action.payload.totalUsers,
                usersPerPage: action.payload.usersPerPage,
                currentPage: action.payload.currentPage + 1,
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
                dialogUserSaved: true,
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
        case user.ActionTypes.SHOW_SUCCESS_MESSAGE: {
            return Object.assign({}, state, {
                showSuccessMessage: true
            });
        }
        case user.ActionTypes.HIDE_SUCCESS_MESSAGE: {
            return Object.assign({}, state, {
                showSuccessMessage: false
            });
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
export const getUser = (state: State) => state.user;
export const getDialogLoading = (state: State) => state.dialogLoading;
export const getDialogUserSaved = (state: State) => state.dialogUserSaved;
export const getDialogHasError = (state: State) => state.dialogHasError;
export const getDialogError = (state: State) => state.dialogError;
export const getShowSuccessMessage = (state: State) => state.showSuccessMessage;
export const getTotalUsers = (state: State) => state.totalUsers;
export const getUsersPerPage = (state: State) => state.usersPerPage;
export const getCurrentPage = (state: State) => state.currentPage;
