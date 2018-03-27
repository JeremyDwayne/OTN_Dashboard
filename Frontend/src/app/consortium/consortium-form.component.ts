import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consortium-form',
  templateUrl: './consortium-form.component.html',
  styleUrls: ['./consortium.component.sass']
})
export class ConsortiumFormComponent {
  @Input() consortiumForm: FormGroup;
  @Input() consortium_slug: string;
  @Input() consortium_id: number;
  @Input() admins: any[];
  consortium: any;
}
