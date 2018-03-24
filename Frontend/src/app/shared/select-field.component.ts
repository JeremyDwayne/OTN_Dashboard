import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class SelectFieldComponent {
  @Input() attribute: string;
  @Input() label: string;
  @Input() append_icon: string;
  @Input() link: string;
  @Input() class: string;
  @Input() options: any[];
  @Input() type: string = 'text';
  @Input() submitted: boolean;
  @Input() control: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){ }
}
