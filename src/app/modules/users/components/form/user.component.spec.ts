import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserComponent } from './user.component';
import { User } from 'modules/users/models';
import { reducer } from 'reducers';
import * as dialogActions from 'actions/dialog';

describe('UserComponent', () => {
    let fixture;
    let component;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent],
            imports: [
                StoreModule.provideStore(reducer),
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
        fixture = null;
        component = null;
    });

    it('should be initialized with the initial state of the store', () => {
        fixture.detectChanges();

        const state = Observable.combineLatest(
            component.user$,
            component.isLoading$,
            component.hasError$,
            component.error$,
            (user, isLoading, hasError, error) => {
                return {
                    user: user,
                    isLoading: isLoading,
                    hasError: hasError,
                    error: error
                };
            }
        );

        state.subscribe(data => {
            const emptyUser = new User();
            assertUsersAreEqual(<User>data.user, emptyUser);
            expect(data.isLoading).toBeFalsy();
            expect(data.hasError).toBeFalsy();
            expect(data.error).toBeNull();
        });
    });

    it('should dispatch CreateAction on save', () => {
        const user = new User('first name', 'last name', 'email@test.com');
        const expectedAction = new dialogActions.CreateAction(user);

        spyOn(component.store, 'dispatch');

        component.save(user);

        expect(component.store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    function assertUsersAreEqual(actual: User, expected: User) {
        expect(Object.keys(actual).length).toBe(Object.keys(expected).length);
        expect(actual.firstName).toBe(expected.firstName);
        expect(actual.lastName).toBe(expected.lastName);
        expect(actual.email).toBe(expected.email);
        expect(actual.id).toBe(expected.id);
        expect(actual.dateOfBirth.getFullYear()).toBe(expected.dateOfBirth.getFullYear());
        expect(actual.dateOfBirth.getMonth()).toBe(expected.dateOfBirth.getMonth());
        expect(actual.dateOfBirth.getDate()).toBe(expected.dateOfBirth.getDate());
    }
});
