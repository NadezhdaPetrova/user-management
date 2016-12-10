import { defaultPageNumber, defaultItemsPerPage} from './constants';
import * as usersActions from 'actions/users';

export interface State {
    totalUsers?: number;
    usersPerPage?: number;
    currentPage?: number;
}

const initialState: State = {
    totalUsers: null,
    usersPerPage: defaultItemsPerPage,
    currentPage: defaultPageNumber
};

export function reducer(state: State = initialState, action: usersActions.Actions): State {
    switch (action.type) {
        case usersActions.ActionTypes.LOAD_SUCCESS: {
            const newState: State = {
                totalUsers: action.payload.totalUsers,
                usersPerPage: action.payload.usersPerPage,
                currentPage: action.payload.currentPage + 1
            };

            return Object.assign({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export const getTotalUsers = (state: State) => state.totalUsers;
export const getUsersPerPage = (state: State) => state.usersPerPage;
export const getCurrentPage = (state: State) => state.currentPage;
