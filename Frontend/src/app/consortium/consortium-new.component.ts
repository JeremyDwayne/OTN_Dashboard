import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Consortium } from './consortium';
import { ConsortiumService } from './consortium.service';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-consortium-new',
  templateUrl: './consortium-new.component.html',
  styleUrls: ['./consortium.component.sass']
})
export class ConsortiumNewComponent implements OnInit {
  consortium = new Consortium;
  institutions: Institution[];
  users: User[];
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 

  constructor(
    private consortiumService: ConsortiumService, 
    private institutionService: InstitutionService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService
  ) {
    breadcrumbService.addFriendlyNameForRoute('/consortium', 'consortia');
  }
  
  ngOnInit() {
    this.starts_at_date.setMinutes(0);

    let timer = Observable.timer(0, 25000);
    timer.subscribe(() => this.getInstitutions());
    timer.subscribe(() => this.getUsers());
  }

  createConsortium(consortium: Consortium) {
    this.submitted = true;
    this.consortiumService.createConsortium(consortium)
      .subscribe(
        data => { return true }, 
        error => { 
          console.log("Error creating consortium" + error);
          return Observable.throw(error);
        });
  }

  getInstitutions() {
    this.institutionService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
