import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InstitutionService } from '../institution/institution.service';

@Component({
  selector: 'app-workshop-form',
  templateUrl: './workshop-form.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopFormComponent {
  @Input() workshopForm: FormGroup;
  @Input() institution_slug: string;
  @Input() institution_id: number;
  institution: any;
  @Input() facilitators: any[];
  currencies = [
    { id: 'USD',  attributes: { name: 'USD',  icon: 'fa-dollar-sign' }}, 
    { id: 'CAD',  attributes: { name: 'CAD',  icon: 'fa-dollar-sign' }}, 
    { id: 'Euro', attributes: { name: 'Euro', icon: 'fa-euro-sign'   }}
  ]
}
