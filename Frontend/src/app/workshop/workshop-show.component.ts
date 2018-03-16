import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { User } from '../user/user';
import { AttendeeShowComponent } from '../user/attendee-show.component';

@Component({
  selector: 'app-workshop-show',
  templateUrl: './workshop-show.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopShowComponent implements OnInit {
  id: number;
  slug: string;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private workshopService: WorkshopService
  ) { }

  @Input() workshop: Workshop;
  @Input() attendees: User[];

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.slug = params['slug'];
      }
    )
    let workshopRequest = this.route.params.flatMap((params: Params) =>
      this.workshopService.getWorkshop(params['slug']));
    workshopRequest.subscribe(response => this.workshop = response.json());
  }

}
