import * as fromUsers from './users';
import * as usersActions from 'actions/users';

import { PageInfo, SortDescriptor, SortDirection, UsersInfo, User } from 'modules/users/models';

describe('Users reducer tests', () => {
    // Mock start
    const sortMock: SortDescriptor = Object.freeze({
        property: 'testProperty',
        direction: SortDirection.Descending
    });

    const pageInfoMock: PageInfo = Object.freeze({
        page: 4,
        size: 13,
        sort: sortMock
    });

    const initialStateMock: fromUsers.State = Object.freeze({
        collection: [],
        pageInfo: null,
        isLoading: false,
        hasError: false,
        error: null
    });

    const usersMock: Array<User> = Object.freeze([
        new User('first name 1', 'last name 1', 'email1@test.com'),
        new User('first name 2', 'last name 2', 'email2@test.com')
    ]);

    const usersInfoMock: UsersInfo = Object.freeze(new UsersInfo(usersMock, 2, 1, 2));
    // Mock end

    it('should update the state on users load action', () => {
        const loadAction = new usersActions.LoadAction(pageInfoMock);
        const state = initialStateMock;
        const expectedState = Object.assign({}, state, {
            isLoading: true,
            pageInfo: pageInfoMock
        });

        const actualState = fromUsers.reducer(state, loadAction);
        expect(actualState).toEqual(expectedState);
    });

    it('should update the state on users load success', () => {
        const loadSuccessAction = new usersActions.LoadSuccessAction(usersInfoMock);
        const state = Object.assign({}, initialStateMock, {
            isLoading: true
        });
        const expectedState = Object.assign({}, state, {
            collection: usersMock,
            isLoading: false
        });

        const actualState = fromUsers.reducer(state, loadSuccessAction);
        expect(actualState).toEqual(expectedState);
        expect(actualState.collection).toBe(expectedState.collection);
    });

    it('should update the state on users load fail', () => {
        const errorMessage = 'something went wrong';
        const loadFailAction = new usersActions.LoadFailAction(errorMessage);
        const state = Object.assign({}, initialStateMock, {
            isLoading: true
        });
        const expectedState = Object.assign({}, state, {
            isLoading: false,
            hasError: true,
            error: errorMessage
        });

        const actualState = fromUsers.reducer(state, loadFailAction);
        expect(actualState).toEqual(expectedState);
    });

    it('should return the collection from getCollection', () => {
        // collection is empty array
        let collection = fromUsers.getCollection(initialStateMock);
        expect(collection).toBe(initialStateMock.collection);

        // collection is array with items
        const stateWithItems = Object.assign({}, initialStateMock, {
            collection: usersMock
        });
        collection = fromUsers.getCollection(stateWithItems);
        expect(collection).toBe(usersMock);
    });

    it('should return the pageInfo from getPageInfo', () => {
        // page info is null
        let pageInfo = fromUsers.getPageInfo(initialStateMock);
        expect(pageInfo).toBe(initialStateMock.pageInfo);

        // page info is an object
        const stateWithPageInfo = Object.assign({}, initialStateMock, {
            pageInfo: pageInfoMock
        });
        pageInfo = fromUsers.getPageInfo(stateWithPageInfo);
        expect(pageInfo).toBe(pageInfoMock);
    });

    it('should return whether the users are loading from getIsLoading', () => {
        // isLoading is false
        let isLoading = fromUsers.getIsLoading(initialStateMock);
        expect(isLoading).toBeFalsy();

        // isLoading is true
        const state = Object.assign({}, initialStateMock, {
            isLoading: true
        });
        isLoading = fromUsers.getIsLoading(state);
        expect(isLoading).toBeTruthy();
    });

    it('should return whether there is an error from getHasError', () => {
        // hasError is false
        let hasError = fromUsers.getHasError(initialStateMock);
        expect(hasError).toBeFalsy();

        // hasError is true
        const state = Object.assign({}, initialStateMock, {
            hasError: true
        });
        hasError = fromUsers.getHasError(state);
        expect(hasError).toBeTruthy();
    });

    it('should return the error from getError', () => {
        // error is null
        let error = fromUsers.getError(initialStateMock);
        expect(error).toBe(initialStateMock.error);

        // error is set
        const errorMessage = 'something went wrong';
        const state = Object.assign({}, initialStateMock, {
            error: errorMessage
        });
        error = fromUsers.getError(state);
        expect(error).toBe(errorMessage);
    });
});
