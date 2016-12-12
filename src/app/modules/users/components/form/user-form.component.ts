import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { User } from 'modules/users/models';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
    @Input('user') set user(value: User) {
        this.selectedUser = Object.assign({}, value);
    }
    @Output() save: EventEmitter<User> = new EventEmitter<User>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    selectedUser: User;

    today: Date = new Date();
}
