import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Consortium } from './consortium';
import { ConsortiumService } from './consortium.service';
import { UserService } from '../user/user.service';
import { AlertService } from '../shared/alert.service';

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
    private formBuilder: FormBuilder,
    private alertService: AlertService
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
    this.consortiumService.createConsortium(this.consortiumForm.value).subscribe(
      data => { 
        this.redirectAfterCreate(data);
        this.alertService.success(["Successfully created consoritum!"]);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error);
      });
  }


  redirectAfterCreate(consortium: Consortium): void {
    this.router.navigate(['/consortia/' + consortium.slug]) ;
  }

  getAdmins() {
    this.userService.getAdmins().subscribe(admins => this.admins = admins);
  }

}
