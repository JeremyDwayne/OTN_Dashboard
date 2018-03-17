import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-workshop-new',
  templateUrl: './workshop-new.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopNewComponent implements OnInit {
  workshop = new Workshop;
  institutions: Institution[];
  users: User[];
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 
  institution_slug: string;

  workshopForm: FormGroup;

  constructor(
    private workshopService: WorkshopService, 
    private institutionService: InstitutionService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    breadcrumbService.addFriendlyNameForRoute('/workshop', 'workshops');
  }
  
  ngOnInit() {
    this.submitted = false;
    this.workshopForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      starts_at: ['', Validators.required],
      sign_up_deadline: ['', Validators.required],
      review_deadline: ['', Validators.required],
      institution_id: ['', Validators.required],
      facilitator_id: ['', Validators.required],
      additional_location_info: ['', Validators.required],
      duration: ['', Validators.required],
      stipend_cents: ['', Validators.required],
      stipend_currency: ['', Validators.required],
      attendee_limit: ['', Validators.required],
      slug: ['', Validators.required],
    });

    this.institution_slug = this.route.params['value']['slug'];

    this.starts_at_date.setMinutes(0);

    let timer = Observable.timer(0, 25000);
    timer.subscribe(() => this.getInstitutions());
    timer.subscribe(() => this.getUsers());
  }

  createWorkshop(workshop: Workshop) {
    this.submitted = true;
    this.workshopService.createWorkshop(workshop)
      .subscribe(
        data => { return true }, 
        error => { 
          console.log("Error creating workshop" + error);
          return Observable.throw(error);
        });
  }

  getInstitutions() {
    this.institutionService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
