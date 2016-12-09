import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
    @Input() message: string;
    @Input() type: 'success' | 'danger';
}
