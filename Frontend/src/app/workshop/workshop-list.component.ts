import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Workshop } from './workshop';
import { WorkshopService } from './workshop.service';
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop.component.sass']
})
export class WorkshopListComponent implements OnInit {
  workshops: Workshop[];

  constructor(
    private workshopService: WorkshopService, 
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) { 
    breadcrumbService.addFriendlyNameForRoute('/workshops', 'My Workshops');
  }

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
