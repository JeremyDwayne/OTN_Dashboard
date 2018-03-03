import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService, private modalService: NgbModal) { 
    this._tokenService.init({
      registerAccountPath: 'http://localhost:3000/api/v1/auth'
    });
  }

  ngOnInit() {
  }

  // signUp(email: string, password: string) {
  //   this._tokenService.registerAccount({
  //     email: email,
  //     password: password,
  //     passwordConfirmation: password
  //   }).subscribe(
  //     res => console.log(res),
  //     error => console.log(error)
  //   );
  // }
}
