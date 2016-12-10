import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'reducers';

@Component({
    selector: 'app-users-toast',
    template: `
        <div *ngIf="showToastMessage$ | async">
            <app-toast [type]="toastType$ | async" [message]="toastMessage$ | async"></app-toast>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersToastComponent implements OnInit {
    showToastMessage$: Observable<boolean>;
    toastMessage$: Observable<string>;
    toastType$: Observable<'success' | 'danger'>;

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.showToastMessage$ = this.store.select(fromRoot.getToastShowMessage);
        this.toastMessage$ = this.store.select(fromRoot.getToastMessage);
        this.toastType$ = this.store.select(fromRoot.getToastType);
    }
}
