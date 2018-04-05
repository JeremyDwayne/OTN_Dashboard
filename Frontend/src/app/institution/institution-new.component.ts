import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { ConsortiumService } from '../consortium/consortium.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-institution-new',
  templateUrl: './institution-new.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionNewComponent implements OnInit {
  institution = new Institution;
  submitted: boolean = false;
  consortium: any;
  consortium_slug: string;
  consortium_id: number;
  institutionForm: FormGroup;
  currencies = [
    { id: 'USD',  attributes: { name: 'USD',  icon: 'fa-dollar-sign' }}, 
    { id: 'CAD',  attributes: { name: 'CAD',  icon: 'fa-dollar-sign' }}, 
    { id: 'Euro', attributes: { name: 'Euro', icon: 'fa-euro-sign'   }}
  ]

  constructor(
    private institutionService: InstitutionService,
    private consortiumService: ConsortiumService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }
  
  ngOnInit() {
    this.submitted = false;

    this.institutionForm = this.formBuilder.group({
      name: ['', Validators.required],
      address_line_1: [''],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: [''],
      consortium_id: ['', Validators.required]
    });

    this.consortium_slug = this.route.params['value']['slug'];
    this.consortium_id = this.route.params['value']['id'];
    this.getConsortium();
  }

  createInstitution(event) {
    this.submitted = true;
    this.institutionForm.value.consortium_id = this.consortium.data.id;
    this.institution = this.institutionForm.value
    this.institutionService.createInstitution(this.institution).subscribe(
      data => { 
        this.redirectAfterCreate(data);
        this.alertService.success(["Successfully created institution!"]);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error);
      });
  }


  redirectAfterCreate(institution: Institution): void {
    this.router.navigate(['/institutions/' + institution.slug]) ;
  }

  getConsortium() {
    this.consortiumService.getConsortium(this.consortium_slug, this.consortium_id).subscribe(response => this.consortium = response.json());
  }

}
