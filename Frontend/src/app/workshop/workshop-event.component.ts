import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Workshop } from './workshop';
import { User } from '../user/user';

import { AttendeeShowComponent } from '../user/attendee-show.component';

import { WorkshopService } from './workshop.service';
import { InstitutionService } from '../institution/institution.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-workshop-event',
  templateUrl: './workshop-event.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopEventComponent implements OnInit {
  slug: string;
  routeId: any;
  ends_at: number;
  response: Response;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private institutionService: InstitutionService,
    private alertService: AlertService
  ) { }

  @Input() workshop: any;
  @Input() institution: any;
  @Input() attendees: any[];
  @Input() id: number;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.slug = params['slug'];
      }
    )
    let workshopRequest = this.route.params.flatMap((params: Params) =>
      this.workshopService.getWorkshop(params['slug'], this.id));

    workshopRequest.subscribe(response => {
      this.workshop = response.json();
      let start = new Date(this.workshop.data.attributes.starts_at);
      this.ends_at = start.setHours(start.getHours() + this.workshop.data.attributes.duration);

      this.institutionService.getInstitution(null, this.workshop.data.relationships.institution.data.id).subscribe(response => { 
        this.institution = response.json(); 
      });
    });

  }

  registerAttendee(slug: string) {
    this.workshopService.registerAttendee(slug).subscribe(
      data => { 
        this.alertService.success(["Successfully signed up for workshop!"]);
      }, 
      error => { 
        this.alertService.error(JSON.parse(error._body).errors);
        return Observable.throw(error); 
      }
    );
  }

}
