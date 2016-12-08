import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
    @Input() totalItems: number;
    @Input() currentPage: number;
    @Input() itemsPerPage: number;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
}
