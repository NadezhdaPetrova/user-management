import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
    @Input() error: string;
}
