import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'reducers';

@Component({
    selector: 'app-users-pagination',
    template: `
        <app-pagination
            [totalItems]="totalUsers$ | async" [currentPage]="currentPage$ | async" 
            [itemsPerPage]="usersPerPage$ | async" (pageChanged)="pageChanged.emit($event)">
        </app-pagination>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPaginationComponent implements OnInit {
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    totalUsers$: Observable<number>;
    usersPerPage$: Observable<number>;
    currentPage$: Observable<number>;
    showNavigation$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.totalUsers$ = this.store.select(fromRoot.getPaginationTotalUsers);
        this.usersPerPage$ = this.store.select(fromRoot.getPaginationUsersPerPage);
        this.currentPage$ = this.store.select(fromRoot.getPaginationCurrentPage);
    }
}
