import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { InstitutionService } from '../../institution/institution.service';
import { Institution } from '../../institution/institution';
import { AlertService } from '../../shared/alert.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  submitted: boolean;
  signupForm: FormGroup;
  institutions: any;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private institutionService: InstitutionService,
    private alertService: AlertService
  ) { }

  @Input() workshop_id: number;
  @Input() institution_id: string;

  ngOnInit() {
    this.submitted = false;
    this.signupForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      institution_id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getInstitutions();
  }

  submit(value: any){
    this.submitted = true;
    if (!this.signupForm.valid) {return;}
    this.authService.signUp(value.first_name, value.last_name, value.email, value.password, value.institution_id);
  }

  getInstitutions(): any {
    this.institutionService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  }

}
