import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { WorkshopFormComponent } from './workshop-form.component';

@Component({
  selector: 'app-workshop-new',
  templateUrl: './workshop-new.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopNewComponent implements OnInit {
  workshop = new Workshop;
  institution: any;
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 
  institution_slug: string;
  facilitators: any[];

  workshopForm: FormGroup;

  constructor(
    private workshopService: WorkshopService, 
    private institutionService: InstitutionService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    breadcrumbService.addFriendlyNameForRoute('/workshop', 'workshops');
  }
  
  ngOnInit() {
    this.submitted = false;

    this.workshopForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      institution_id: ['', Validators.required],
      facilitator_id: ['', Validators.required],
      starts_at: ['', Validators.required],
      additional_location_info: [''],
      duration: [''],
      stipend_cents: ['200.00'],
      stipend_currency: ['USD'],
      sign_up_deadline: [''],
      attendee_limit: [''],
      review_deadline: [''],
    });

    this.institution_slug = this.route.params['value']['slug'];
    this.getInstitution();
    this.getFacilitators();

    this.starts_at_date.setMinutes(0);
  }

  createWorkshop(workshop: Workshop) {
    // console.log(event);
    this.submitted = true;
    this.workshopForm.value.institution_id = this.institution.data.id;
    this.workshopService.createWorkshop(this.workshopForm.value)
      .subscribe(
        data => { this.redirectAfterCreate(data)}, 
        error => { 
          console.log("Error creating workshop" + error);
          return Observable.throw(error);
        });
  }

  redirectAfterCreate(workshop: Workshop): void {
    console.log(workshop);
    this.router.navigate(['/workshops/' + workshop.slug]) ;
  }

  getInstitution() {
    this.institutionService.getInstitution(this.institution_slug, null).subscribe(response => this.institution = response.json());
  }

  getFacilitators() {
    this.institutionService.getFacilitators(this.institution_slug, null).subscribe(facilitators => this.facilitators = facilitators);
  }
}
