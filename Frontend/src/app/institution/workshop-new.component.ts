import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Workshop } from './workshop';
import { Institution } from '../institution/institution';
import { WorkshopService } from './workshop.service';

@Component({
  selector: 'app-workshop-new',
  templateUrl: './workshop-new.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopNewComponent implements OnInit {
  workshop = new Workshop;
  institutions: Institution[];
  submitted: boolean = false;
  starts_at_date: Date = new Date(Date.now()); 

  constructor(private workshopService: WorkshopService) { }
  
  ngOnInit() {
    this.starts_at_date.setMinutes(0);

    let timer = Observable.timer(0, 25000);
    timer.subscribe(() => this.getInstitutions());
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
    this.workshopService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  }

}
