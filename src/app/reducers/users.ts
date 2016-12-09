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
    showToastMessage: boolean;
    toastMessage: string;
    toastType: 'success' | 'danger';
    totalUsers: number;
    usersPerPage: number;
    currentPage: number;
    deletionSuccessful: boolean;
    deletionHasError: boolean;
    deletionError: string;
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
    showToastMessage: false,
    toastMessage: null,
    toastType: null,
    totalUsers: null,
    usersPerPage: defaultPageInfo.size,
    currentPage: defaultPageInfo.page,
    deletionSuccessful: false,
    deletionHasError: false,
    deletionError: null
};

export function reducer(state: State = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                isLoading: true,
                dialogUserSaved: false,
                deletionSuccessful: false,
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
        case user.ActionTypes.SHOW_TOAST_MESSAGE: {
            return Object.assign({}, state, {
                showToastMessage: true,
                toastMessage: action.payload.message,
                toastType: action.payload.type
            });
        }
        case user.ActionTypes.HIDE_TOAST_MESSAGE: {
            return Object.assign({}, state, {
                showToastMessage: false,
                deletionHasError: false,
                deletionError: null
            });
        }
        case user.ActionTypes.DELETE_SUCCESS: {
            return Object.assign({}, state, {
                deletionSuccessful: true
            });
        }
        case user.ActionTypes.DELETE_FAIL: {
            return Object.assign({}, state, {
                deletionHasError: true,
                deletionError: action.payload
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
export const getShowToastMessage = (state: State) => state.showToastMessage;
export const getToastMessage = (state: State) => state.toastMessage;
export const getToastType = (state: State) => state.toastType;
export const getTotalUsers = (state: State) => state.totalUsers;
export const getUsersPerPage = (state: State) => state.usersPerPage;
export const getCurrentPage = (state: State) => state.currentPage;
export const getDeletionSuccessful = (state: State) => state.deletionSuccessful;
export const getDeletionHasError = (state: State) => state.deletionHasError;
export const getDeletionError = (state: State) => state.deletionError;
