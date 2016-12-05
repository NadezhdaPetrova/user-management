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
export const getUserIsLoading = createSelector(getUsersState, fromUsers.getIsLoading);
export const getUserHasError = createSelector(getUsersState, fromUsers.getHasError);
export const getUserError = createSelector(getUsersState, fromUsers.getError);
export const getUser = createSelector(getUsersState, fromUsers.getUser);
export const getUserDialogLoading = createSelector(getUsersState, fromUsers.getDialogLoading);
export const getUserDialogSaved = createSelector(getUsersState, fromUsers.getDialogSaved);
export const getUserDialogHasError = createSelector(getUsersState, fromUsers.getDialogHasError);
export const getUserDialogError = createSelector(getUsersState, fromUsers.getDialogError);
