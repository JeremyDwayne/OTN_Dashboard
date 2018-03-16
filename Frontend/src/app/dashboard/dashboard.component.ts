import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Dashboard } from './dashboard';
import { InstitutionShowComponent } from '../institution/institution-show.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService, 
    private router: Router,
  ) { }

  @Input() dashboard: Dashboard;

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.dashboardService.getDashboard().subscribe(dashboard => this.dashboard = dashboard);
  }

}
