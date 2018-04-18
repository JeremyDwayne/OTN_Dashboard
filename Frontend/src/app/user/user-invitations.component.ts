import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrls: ['./user-invitations.component.sass']
})
export class UserInvitationsComponent implements OnInit {
  submitted: boolean;
  invitedForm: FormGroup;
  user: User;
  invitation_token: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.submitted = false;
    this.invitedForm = this.formBuilder.group({
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.invitation_token = params['invitation_token'];
      this.userService.getInvitedUser(this.invitation_token).subscribe(
        response => this.user = response.json());
    })
  }

  acceptInvite(user: User){
    let tempUser = { user: {id: this.user.id, ...this.invitedForm.value, invitation_token: this.invitation_token}};
    this.userService.acceptInvite(this.user.id, tempUser).subscribe(
      data => { 
        this.authService.inviteLogIn(this.user, this.invitedForm.value.password);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error);
      });
  }

}
