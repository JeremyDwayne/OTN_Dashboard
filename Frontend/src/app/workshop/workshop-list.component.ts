import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopListComponent implements OnInit {
  workshops: any;

  constructor(
    private workshopService: WorkshopService, 
    private router: Router,
  ) { }

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
