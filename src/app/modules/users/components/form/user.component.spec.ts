import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { StoreModule } from '@ngrx/store';
import { MdDialogModule, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { UserComponent } from './user.component';
import { User } from 'modules/users/models';
import { reducer } from 'reducers';
import * as dialogActions from 'actions/dialog';

describe('UserComponent', () => {
    let userComponentInstance;

    // We must create this component in order to open a dialog
    // so that UserComponent's dialogRef can be initialized
    @Component({
        selector: 'app-test-component',
        template: '',
    })
    class TestComponent {
        constructor(private dialog: MdDialog) {
            const dialogRef = this.dialog.open(UserComponent);
            userComponentInstance = dialogRef.componentInstance;
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent, TestComponent],
            imports: [
                StoreModule.provideStore(reducer),
                MdDialogModule.forRoot()
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        // The component that will be created in the dialog must be added
        // in the module's entryComponents. But configureTestingModule doesn't have
        // entryComponents so we have to override the module
        // More info: https://github.com/angular/angular/issues/10760
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [UserComponent],
            },
        });
    });

    beforeEach(() => {
        TestBed.createComponent(TestComponent);
    });

    afterEach(() => {
        userComponentInstance = null;
    });

    it('should be initialized with the initial state of the store', () => {
        const state = Observable.combineLatest(
            userComponentInstance.user$,
            userComponentInstance.isLoading$,
            userComponentInstance.hasError$,
            userComponentInstance.error$,
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

        spyOn(userComponentInstance.store, 'dispatch');

        userComponentInstance.save(user);

        expect(userComponentInstance.store.dispatch).toHaveBeenCalledWith(expectedAction);
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
