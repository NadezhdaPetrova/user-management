import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { ContentFormatPipe } from './pipes/content-format.pipe';

@NgModule({
    declarations: [ContentFormatPipe],
    exports: [
        ContentFormatPipe,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        RouterModule,
        MaterialModule
    ]
})
export class SharedModule { }
