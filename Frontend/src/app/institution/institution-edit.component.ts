import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-institution-edit',
  templateUrl: './institution-edit.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionEditComponent implements OnInit {
  institution: any;
  submitted: boolean = false;
  institutionForm: FormGroup;
  id: number;

  constructor(
    private institutionService: InstitutionService,
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

    let institutionRequest = this.route.params.flatMap((params: Params) =>
      this.institutionService.getInstitution(params['slug'], this.id));
    institutionRequest.subscribe(response => {
      this.institution = response.json().data;
      this.id = this.institution.id
      this.institutionForm.patchValue(this.institution.attributes);
    });
  }

  updateInstitution(event) {
    this.submitted = true;
    this.institutionForm.value.id = this.id;
    this.institutionService.updateInstitution(this.institutionForm.value).subscribe(
      data => { 
        this.redirectAfterUpdate(data);
        this.alertService.success(["Successfully updated institution!"]);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error); 
      }
    );
  }


  redirectAfterUpdate(institution: Institution): void {
    this.router.navigate(['/institutions/' + institution.slug]) ;
  }

  
}
