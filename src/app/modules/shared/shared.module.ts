import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AlertModule, PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ContentFormatPipe } from './pipes/content-format.pipe';
import { ErrorComponent } from './components/error.component';
import { PaginationComponent} from './components/pagination.component';

@NgModule({
    declarations: [ContentFormatPipe, ErrorComponent, PaginationComponent],
    imports: [AlertModule, PaginationModule],
    exports: [
        ContentFormatPipe,
        ErrorComponent,
        PaginationComponent,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        RouterModule,
        MaterialModule,
        AlertModule,
        PaginationModule
    ]
})
export class SharedModule { }
