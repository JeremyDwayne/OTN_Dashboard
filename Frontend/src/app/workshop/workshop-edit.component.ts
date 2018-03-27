import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { WorkshopFormComponent } from './workshop-form.component';

@Component({
  selector: 'app-workshop-edit',
  templateUrl: './workshop-edit.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopEditComponent implements OnInit {
  workshop: any;
  institution: any;
  facilitators: any[];
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 
  institution_id: number;
  @Input() id: number;

  workshopForm: FormGroup;

  constructor(
    private workshopService: WorkshopService, 
    private institutionService: InstitutionService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    breadcrumbService.addFriendlyNameForRoute('/workshop', 'workshops');
  }
  
  ngOnInit() {
    this.submitted = false;

    this.workshopForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      institution_id: ['', Validators.required],
      facilitator_id: ['', Validators.required],
      starts_at: ['', Validators.required],
      additional_location_info: [''],
      duration: [''],
      stipend_cents: [''],
      stipend_currency: [''],
      sign_up_deadline: [''],
      attendee_limit: [''],
      review_deadline: [''],
    });

    let workshopRequest = this.route.params.flatMap((params: Params) =>
      this.workshopService.getWorkshop(params['slug'], this.id));
    workshopRequest.subscribe(response => {
      this.workshop = response.json().data;
      this.id = this.workshop.id
      console.log(this.workshop);
      this.institution_id = this.workshop.attributes.institution_id;
      this.getFacilitators();
      this.workshopForm.patchValue(this.workshop.attributes);
    });


    this.starts_at_date.setMinutes(0);
  }

  updateWorkshop(workshop: Workshop) {
    console.log(this.workshopForm);
    this.submitted = true;
    this.workshopForm.value.id = this.id;
    this.workshopService.updateWorkshop(this.workshopForm.value)
      .subscribe(
        data => { this.redirectAfterCreate(data)}, 
        error => { 
          console.log("Error updating workshop" + error);
          return Observable.throw(error);
        });
  }

  redirectAfterCreate(workshop: Workshop): void {
    console.log(workshop);
    this.router.navigate(['/workshops/' + workshop.slug]) ;
  }

  getFacilitators() {
    this.institutionService.getFacilitators(null, this.institution_id).subscribe(facilitators => this.facilitators = facilitators);
  }
}
