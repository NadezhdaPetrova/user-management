import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AlertModule, PaginationModule, DatepickerModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ContentFormatPipe } from './pipes/content-format.pipe';
import { ErrorComponent } from './components/error/error.component';
import { PaginationComponent} from './components/pagination/pagination.component';
import { ToastComponent } from './components/toast/toast.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
    declarations: [
        ContentFormatPipe,
        ErrorComponent,
        PaginationComponent,
        ToastComponent,
        DatepickerComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AlertModule,
        PaginationModule,
        DatepickerModule,
        ModalModule
    ],
    exports: [
        ContentFormatPipe,
        ErrorComponent,
        PaginationComponent,
        ToastComponent,
        DatepickerComponent,
        FormsModule,
        HttpModule,
        CommonModule,
        MaterialModule,
        AlertModule,
        PaginationModule,
        ModalModule
    ]
})
export class SharedModule { }
