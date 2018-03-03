import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-label',
  template: `
    <div *ngIf="control.errors && (submitted || control.dirty || control.touched)">
      <div *ngFor="let error of (control.errors | errorMessages)">
        <small class="text-danger">{{ error }}</small>
      </div>
    </div>
  `
})
export class ErrorLabelComponent {
  @Input() control: FormControl;
  @Input() submitted: boolean;
}
