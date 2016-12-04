import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../models';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
    @Input() users: Array<User>;
}
