import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Dashboard } from './dashboard';
import { User } from '../user/user';
import { InstitutionShowComponent } from '../institution/institution-show.component';
import { DashboardService } from './dashboard.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService, 
    private _tokenService: Angular2TokenService
  ) { }

  @Input() dashboard: any;

  ngOnInit() {
    this._tokenService.init();
    this.getDashboard();
  }


  getDashboard() {
    this.dashboardService.getDashboard().subscribe(dashboard => this.dashboard = dashboard);
  }

}
