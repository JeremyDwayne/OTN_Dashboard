import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(value: any){
    this.submitted = true;
    if (!this.loginForm.valid) {return;}
    this.authService.logIn(value.email, value.password).subscribe(
      this.authService.redirectAfterLogin.bind(this.authService),
      this.afterFailedLogin.bind(this)
    );
  }

  afterFailedLogin(errors: any){
    let parsed_errors = JSON.parse(errors._body).errors;
    for(let attribute in this.loginForm.controls) {
      if (parsed_errors[attribute]) {
        this.loginForm.controls[attribute].setErrors(parsed_errors[attribute]);
      }
    }
    this.loginForm.setErrors(parsed_errors);
  }

}
