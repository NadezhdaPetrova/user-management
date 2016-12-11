import { TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

describe('ErrorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorComponent],
            imports: [AlertModule]
        });
    });

    it('should render alert when no error is passed', () => {
        const fixture = TestBed.createComponent(ErrorComponent);

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const alerts = compiled.querySelectorAll('alert[type=danger]');
        expect(alerts.length).toBe(1);

        const alertMessage = alerts[0].querySelector('div.alert-danger');
        expect(alertMessage.innerText).toBe('Something went wrong. Please try again.');
    });

    it('should render alert when empty string is passed for error', () => {
        const fixture = TestBed.createComponent(ErrorComponent);
        const component: ErrorComponent = fixture.debugElement.componentInstance;

        component.error = '';
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const alerts = compiled.querySelectorAll('alert[type=danger]');
        expect(alerts.length).toBe(1);

        const alertMessage = alerts[0].querySelector('div.alert-danger');
        expect(alertMessage.innerText).toBe('Something went wrong. Please try again.');
    });

    it('should render alert with error when an error is passed', () => {
        const fixture = TestBed.createComponent(ErrorComponent);
        const component: ErrorComponent = fixture.debugElement.componentInstance;

        const error = 'The actual error';
        component.error = error;
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        const alerts = compiled.querySelectorAll('alert[type=danger]');
        expect(alerts.length).toBe(1);

        const alertMessage = alerts[0].querySelector('div.alert-danger');
        expect(alertMessage.innerText).toContain('Something went wrong. Please try again.');
        expect(alertMessage.innerText).toContain(`Error: ${error}`);
    });
});
