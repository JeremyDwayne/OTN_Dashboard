import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Angular2TokenService, UserData } from 'angular2-token';
import { NgPipesModule } from 'ng-pipes';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopListComponent implements OnInit {
  workshops: any;
  current_user: UserData;
  current_user_id: number;

  constructor(
    private workshopService: WorkshopService, 
    private router: Router,
    private tokenService: Angular2TokenService
  ) {
  }

  ngOnInit() {
    this.getWorkshops();
    this.tokenService.validateToken().subscribe(
      result => {
        if (result.status == 200){
          this.current_user = result.json().data;
        }
      }
    );
  }

  getWorkshops() {
    this.workshopService.getWorkshops().subscribe(workshops => {
      this.workshops = workshops;
    });
  }

  goToShow(workshop: Workshop): void {
    let workshopLink = ['/workshops', workshop.slug];
    this.router.navigate(workshopLink);
  }

  // This works, but isn't really usable because it requires a page reload
  // to receive the current_user data back from the validateToken() call
  // Angular2-Token is where this falls short of being usable
  findsAttendee(attendees: Array<any>, current_user_id: number): boolean{
    for (var n = 0; n < attendees.length; n++){
      let attendee = attendees[n];
      if (attendee.id == current_user_id) return true;
    }
    return false;
  }

}
