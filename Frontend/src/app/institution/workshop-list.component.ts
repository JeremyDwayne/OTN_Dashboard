import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopListComponent implements OnInit {
  workshops: Workshop[];

  constructor(private workshopService: WorkshopService, private router: Router) { }

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getWorkshops());
  }

  getWorkshops() {
    this.workshopService.getWorkshops().subscribe(workshops => this.workshops = workshops);
  }

  goToShow(workshop: Workshop): void {
    let workshopLink = ['/workshops', workshop.slug];
    this.router.navigate(workshopLink);
  }

}
