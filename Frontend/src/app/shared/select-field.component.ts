import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class SelectFieldComponent {
  @Input() attribute: string;
  @Input() label: string;
  @Input() options: any[];
  @Input() type: string = 'text';
  @Input() submitted: boolean;
  @Input() control: FormControl;
}
