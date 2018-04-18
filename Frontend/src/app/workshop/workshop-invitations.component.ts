import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { WorkshopService } from './workshop.service';
import { InstitutionService } from '../institution/institution.service';

@Component({
  selector: 'app-workshop-invitations',
  templateUrl: './workshop-invitations.component.html',
  styleUrls: ['./workshop-invitations.component.sass']
})
export class WorkshopInvitationsComponent implements OnInit {
  invitationForm: FormGroup;
  submitted: boolean = false;
  workshopId: any;
  institutionSlug: any;
  workshop: any;
  institution: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private workshopService: WorkshopService,
    private institutionService: InstitutionService
  ) { }

  ngOnInit() {
    this.invitationForm = this.formBuilder.group({
      invitees: this.formBuilder.array([
        this.initInvitee(),
      ])
    });

    this.route.params.subscribe(params => {
      this.workshopId = params['id'];
      this.institutionSlug = params['slug'];
    });
    this.initNames();
  }

  initNames() {
    this.workshopService.getWorkshop(null, this.workshopId).subscribe(res => this.workshop = res.json());
    this.institutionService.getInstitution(null, this.institutionSlug).subscribe(res => this.institution = res.json());
  }
  

  initInvitee() {
    return this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['', Validators.required],
    })
  }

  addInvitee() {
    const control = <FormArray>this.invitationForm.controls['invitees'];
    control.push(this.initInvitee());
  }
  removeInvitee(index: number) {

    const control = <FormArray>this.invitationForm.controls['invitees'];
    control.removeAt(index);
  }

  sendInvite(form: FormGroup) {
    let values = {...form.value, workshop_id: this.workshopId, institution_slug: this.institutionSlug }
    console.log(values);
    this.workshopService.sendInvites(values).subscribe(
      data => { 
        this.router.navigate(['/dashboard']);
        this.alertService.success(["Invites sent succesfully!"]);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error);
      });
  }

}
