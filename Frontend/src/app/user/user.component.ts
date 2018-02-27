import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  signUp() {
    this._tokenService.registerAccount({
      email: 'example@example.org',
      password: 'secretPassword',
      passwordConfirmation: 'secretPassword'
    }).subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

// Modal Stuff
//   open(content) {
//     this.modalService.open(content).result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//     }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     });
//   }

//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return  `with: ${reason}`;
//     }
//   }
}
