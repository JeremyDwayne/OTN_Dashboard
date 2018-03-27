import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';
import { User } from '../user/user';
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-workshop-new',
  templateUrl: './workshop-new.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopNewComponent implements OnInit {
  workshop = new Workshop;
  institution: any;
  facilitators: User[];
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 
  institution_slug: string;
  currencies = [
    { id: 'USD',  attributes: { name: 'USD',  icon: 'fa-dollar-sign' }}, 
    { id: 'CAD',  attributes: { name: 'CAD',  icon: 'fa-dollar-sign' }}, 
    { id: 'Euro', attributes: { name: 'Euro', icon: 'fa-euro-sign'   }}
  ]

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

    this.starts_at_date.setMinutes(0);
    this.getInstitution();
    this.getFacilitators();
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
    this.institutionService.getFacilitators(this.institution_slug).subscribe(facilitators => this.facilitators = facilitators);
  }

  // currency_icon: any = this.currencies[0];
  // @ViewChild('iconStipendCurrency') stipend_icon; 
  // setIcon(currency) {
  //   console.log(this.stipend_icon.nativeElement);
  //   this.currency_icon = this.currencies[currency.target.selectedIndex];
  // }
}
