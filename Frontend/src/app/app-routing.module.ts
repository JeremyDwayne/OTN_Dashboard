import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [Angular2TokenService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
