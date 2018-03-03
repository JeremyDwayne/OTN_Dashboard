import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-workshop-new',
  templateUrl: './workshop-new.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopNewComponent implements OnInit {
  workshop = new Workshop;
  institutions: Institution[];
  users: User[];
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 

  constructor(
    private workshopService: WorkshopService, 
    private institutionService: InstitutionService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService
  ) {
    breadcrumbService.addFriendlyNameForRoute('/workshop', 'workshops');
  }
  
  ngOnInit() {
    this.starts_at_date.setMinutes(0);

    let timer = Observable.timer(0, 25000);
    timer.subscribe(() => this.getInstitutions());
    timer.subscribe(() => this.getUsers());
  }

  createWorkshop(workshop: Workshop) {
    this.submitted = true;
    this.workshopService.createWorkshop(workshop)
      .subscribe(
        data => { return true }, 
        error => { 
          console.log("Error creating workshop" + error);
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
