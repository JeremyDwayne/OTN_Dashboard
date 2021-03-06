import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Consortium } from './consortium';
import { ConsortiumService } from './consortium.service';
import { UserService } from '../user/user.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-consortium-edit',
  templateUrl: './consortium-edit.component.html',
  styleUrls: ['./consortium.component.sass']
})
export class ConsortiumEditComponent implements OnInit {
  submitted: boolean = false;
  admins: any;
  consortiumForm: FormGroup;
  consortium: any;
  id: number;

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

    this.consortiumForm = this.formBuilder.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      admin_id: ['', Validators.required]
    });

    let consortiumRequest = this.route.params.flatMap((params: Params) =>
      this.consortiumService.getConsortium(params['slug'], this.id));
    consortiumRequest.subscribe(response => {
      this.getAdmins();
      this.consortium = response.json().data;
      this.id = this.consortium.id
      this.consortiumForm.patchValue(this.consortium.attributes);
    });
  }

  updateConsortium(consortium: Consortium) {
    this.submitted = true;
    this.consortiumForm.value.id = this.id;
    this.consortiumService.updateConsortium(this.consortiumForm.value).subscribe(
      data => { 
        this.redirectAfterUpdate(data);
        this.alertService.success(["Successfully updated consortium!"]);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error);
      });
  }


  redirectAfterUpdate(consortium: Consortium): void {
    this.router.navigate(['/consortia/' + consortium.slug]) ;
  }

  getAdmins() {
    this.userService.getAdmins().subscribe(admins => this.admins = admins);
  }

}
