import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Consortium } from './consortium';
import { ConsortiumService } from './consortium.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-consortium-new',
  templateUrl: './consortium-new.component.html',
  styleUrls: ['./consortium.component.sass']
})
export class ConsortiumNewComponent implements OnInit {
  submitted: boolean = false;
  admins: any;
  consortiumForm: FormGroup;

  constructor(
    private consortiumService: ConsortiumService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit() {
    this.submitted = false;

    this.getAdmins();
    this.consortiumForm = this.formBuilder.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      admin_id: ['', Validators.required]
    });
  }

  createConsortium(consortium: Consortium) {
    this.submitted = true;
    console.log(consortium);
    this.consortiumService.createConsortium(this.consortiumForm.value)
      .subscribe(
        data => { this.redirectAfterCreate(data) }, 
        error => { 
          console.log("Error creating consortium" + error);
          return Observable.throw(error);
        });
  }


  redirectAfterCreate(consortium: Consortium): void {
    console.log(consortium);
    this.router.navigate(['/consortia/' + consortium.slug]) ;
  }

  getAdmins() {
    this.userService.getAdmins().subscribe(admins => this.admins = admins);
  }

}
