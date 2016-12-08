import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { User, SortDirection } from '../models';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
    @Input() users: Array<User>;
    @Input() currentSorting;
    @Output() sort: EventEmitter<string> = new EventEmitter<string>();

    SortDirection = SortDirection;

    isColumnSorted(property: string, sortDirection: SortDirection) {
        return this.currentSorting.property === property && this.currentSorting.direction === sortDirection;
    }
}
