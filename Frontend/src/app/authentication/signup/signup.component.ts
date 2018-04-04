import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { InstitutionService } from '../../institution/institution.service';
import { Institution } from '../../institution/institution';

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
    private institutionService: InstitutionService
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
    this.authService.signUp(value.first_name, value.last_name, value.email, value.password, value.institution_id).subscribe(
      this.authService.redirectAfterLogin.bind(this.authService),
      this.afterFailedSignup.bind(this)
    );
  }

  afterFailedSignup(errors: any){
    let parsed_errors = JSON.parse(errors._body).errors;
    for(let attribute in this.signupForm.controls) {
      if (parsed_errors[attribute]) {
        this.signupForm.controls[attribute].setErrors(parsed_errors[attribute]);
      }
    }
    this.signupForm.setErrors(parsed_errors);
  }

  getInstitutions(): any {
    this.institutionService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  }

}
