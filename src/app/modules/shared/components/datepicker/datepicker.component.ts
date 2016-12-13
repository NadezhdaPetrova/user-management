import { Component, Input, forwardRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const DATEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class DatepickerComponent implements ControlValueAccessor {
    @Input() placeholder: string;

    today: Date = new Date();
    showDatepicker: boolean;

    private datePipe: DatePipe = new DatePipe('en-US');

    private _value: string;
    private _date: Date;

    private onTouchedCallback: () => void = () => { };
    private onChangeCallback: (_: any) => void = () => { };

    get value(): any {
        return this._value;
    };

    set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    get date(): Date {
        return this._date;
    }
    set date(dateValue: Date) {
        this._date = dateValue;
        if (dateValue) {
            this.value = this.datePipe.transform(dateValue, 'y-MM-dd');
        } else {
            this.value = null;
        }
    }

    writeValue(value: any) {
        if (value) {
            this.date = new Date(value);
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    onBlur() {
        this.onTouchedCallback();
    }

    onFocus() {
        this.showDatepicker = true;
    }

    removeDate() {
        this.date = undefined;
        this.showDatepicker = false;
    }
}
