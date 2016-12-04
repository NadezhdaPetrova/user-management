import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { ContentFormatPipe } from './pipes/content-format.pipe';
import { ErrorComponent } from './components/error.component';

@NgModule({
    declarations: [ContentFormatPipe, ErrorComponent],
    exports: [
        ContentFormatPipe,
        ErrorComponent,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        RouterModule,
        MaterialModule
    ]
})
export class SharedModule { }
