import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class TextareaFieldComponent {
  @Input() attribute: string;
  @Input() label: string;
  @Input() rows: string;
  @Input() type: string = 'text';
  @Input() submitted: boolean;
  @Input() control: FormControl;
}
