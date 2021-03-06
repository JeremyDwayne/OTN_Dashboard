import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Workshop } from './workshop';
import { WorkshopEditComponent } from './workshop-edit.component';
import { WorkshopService } from './workshop.service';
import { User } from '../user/user';
import { AttendeeShowComponent } from '../user/attendee-show.component';

@Component({
  selector: 'app-workshop-show',
  templateUrl: './workshop-show.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopShowComponent implements OnInit {
  slug: string;
  routeId: any;
  ends_at: number;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private workshopService: WorkshopService
  ) { }

  @Input() workshop: any;
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
    });
  }

  // openEditModal() {
  //   const modal = this.modalService.open(WorkshopEditComponent);
  //   modal.componentInstance.id = this.id;
  //   modal.componentInstance.selector = "app-workshop-edit";
  // }

}
