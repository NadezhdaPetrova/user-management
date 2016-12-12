import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { User } from 'modules/users/models';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
    // NOTE: In the template we set both ngModel and value properties on md-inputs
    // because of the following bug: when an item is opened for edit
    // the input label hides the real input value because md-empty class is set to the label.
    // This class is set if _value is not set on the input. _value is not set because
    // writeValue() is called after the invocation of the empty() getter.
    // Source code: https://github.com/angular/material2/blob/master/src/lib/input/input.ts
    // The December 2016 a major refactoring of the md-input must be finished and this hack 
    // may not be needed anymore.
    @Input('user') set user(value: User) {
        this.selectedUser = Object.assign({}, value);
    }
    @Output() save: EventEmitter<User> = new EventEmitter<User>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    selectedUser: User;

    today: Date = new Date();
}
