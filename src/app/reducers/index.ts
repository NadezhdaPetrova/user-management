import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromUsers from './users';

export interface State {
  users: fromUsers.State;
}

const reducers = {
  users: fromUsers.reducer
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

export const getUsersState = (state: State) => state.users;

export const getUserCollection = createSelector(getUsersState, fromUsers.getCollection);
export const getUsersPageInfo = createSelector(getUsersState, fromUsers.getPageInfo);
export const getUserIsLoading = createSelector(getUsersState, fromUsers.getIsLoading);
export const getUserHasError = createSelector(getUsersState, fromUsers.getHasError);
export const getUserError = createSelector(getUsersState, fromUsers.getError);
export const getUser = createSelector(getUsersState, fromUsers.getUser);
export const getUserDialogLoading = createSelector(getUsersState, fromUsers.getDialogLoading);
export const getUserDialogUserSaved = createSelector(getUsersState, fromUsers.getDialogUserSaved);
export const getUserDialogHasError = createSelector(getUsersState, fromUsers.getDialogHasError);
export const getUserDialogError = createSelector(getUsersState, fromUsers.getDialogError);
export const getUserShowToastMessage = createSelector(getUsersState, fromUsers.getShowToastMessage);
export const getUserToastMessage = createSelector(getUsersState, fromUsers.getToastMessage);
export const getUserToastType = createSelector(getUsersState, fromUsers.getToastType);
export const getTotalUsers = createSelector(getUsersState, fromUsers.getTotalUsers);
export const getUsersPerPage = createSelector(getUsersState, fromUsers.getUsersPerPage);
export const getUsersCurrentPage = createSelector(getUsersState, fromUsers.getCurrentPage);
export const getUsersDeletionInProgress = createSelector(getUsersState, fromUsers.getDeletionInProgress);
export const getUsersDeletionSuccessful = createSelector(getUsersState, fromUsers.getDeletionSuccessful);
export const getUsersDeletionHasError = createSelector(getUsersState, fromUsers.getDeletionHasError);
export const getUsersDeletionError = createSelector(getUsersState, fromUsers.getDeletionError);
