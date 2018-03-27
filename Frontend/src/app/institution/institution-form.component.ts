import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionFormComponent {
  @Input() institutionForm: FormGroup;
  @Input() institution_slug: string;
  @Input() institution_id: number;
  institution: any;
}
