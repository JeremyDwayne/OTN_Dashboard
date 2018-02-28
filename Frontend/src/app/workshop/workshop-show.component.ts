import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';

@Component({
  selector: 'app-workshop-show',
  templateUrl: './workshop-show.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopShowComponent implements OnInit {
  id: number;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private workshopService: WorkshopService
  ) { }

  @Input() workshop: Workshop;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    )
    let workshopRequest = this.route.params.flatMap((params: Params) =>
      this.workshopService.getWorkshop(+params['id']));
    workshopRequest.subscribe(response => this.workshop = response.json());
  }

}
