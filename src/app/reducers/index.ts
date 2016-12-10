import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as users from './users';
import * as dialog from './dialog';
import * as deletion from './deletion';
import * as pagination from './pagination';
import * as toast from './toast';

export interface State {
  users: users.State;
  dialog: dialog.State;
  deletion: deletion.State;
  pagination: pagination.State;
  toast: toast.State;
}

const reducers = {
  users: users.reducer,
  dialog: dialog.reducer,
  deletion: deletion.reducer,
  pagination: pagination.reducer,
  toast: toast.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Users
export const getUsersState = (state: State) => state.users;

export const getUsersCollection = createSelector(getUsersState, users.getCollection);
export const getUsersPageInfo = createSelector(getUsersState, users.getPageInfo);
export const getUsersIsLoading = createSelector(getUsersState, users.getIsLoading);
export const getUsersHasError = createSelector(getUsersState, users.getHasError);
export const getUsersError = createSelector(getUsersState, users.getError);

// Dialog
export const getDialogState = (state: State) => state.dialog;

export const getDialogUser = createSelector(getDialogState, dialog.getUser);
export const getDialogIsLoading = createSelector(getDialogState, dialog.getIsLoading);
export const getDialogIsUserSaved = createSelector(getDialogState, dialog.getIsUserSaved);
export const getDialogHasError = createSelector(getDialogState, dialog.getHasError);
export const getDialogError = createSelector(getDialogState, dialog.getError);

// Deletion
export const getDeletionState = (state: State) => state.deletion;

export const getDeletionIsInProgress = createSelector(getDeletionState, deletion.getIsInProgress);
export const getDeletionIsSuccessful = createSelector(getDeletionState, deletion.getIsSuccessful);
export const getDeletionHasError = createSelector(getDeletionState, deletion.getHasError);
export const getDeletionError = createSelector(getDeletionState, deletion.getError);

// Pagination
export const getPaginationState = (state: State) => state.pagination;

export const getPaginationTotalUsers = createSelector(getPaginationState, pagination.getTotalUsers);
export const getPaginationUsersPerPage = createSelector(getPaginationState, pagination.getUsersPerPage);
export const getPaginationCurrentPage = createSelector(getPaginationState, pagination.getCurrentPage);

// Toast
export const getToastState = (state: State) => state.toast;

export const getToastShowMessage = createSelector(getToastState, toast.getShowMessage);
export const getToastMessage = createSelector(getToastState, toast.getMessage);
export const getToastType = createSelector(getToastState, toast.getType);
