import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { InputFieldComponent } from './input-field.component';
import { SelectFieldComponent } from './select-field.component';
import { TextareaFieldComponent } from './textarea-field.component';
import { ErrorLabelComponent } from './error-label.component';

import { ErrorMessagesPipe }   from './error-messages.pipe';

@NgModule({
    declarations: [
      InputFieldComponent,
      SelectFieldComponent,
      TextareaFieldComponent,
      ErrorLabelComponent,
      ErrorMessagesPipe
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule
    ],
    exports: [
      InputFieldComponent,
      SelectFieldComponent,
      TextareaFieldComponent,
      ErrorLabelComponent
    ]
})
export class SharedModule {}
