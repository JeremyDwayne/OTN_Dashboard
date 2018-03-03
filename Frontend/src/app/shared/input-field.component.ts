import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class InputFieldComponent {
  @Input() attribute: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() type: string = 'text';
  @Input() submitted: boolean;
  @Input() control: FormControl;
  @Input() minlength: string;
}
