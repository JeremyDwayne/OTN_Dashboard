import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { WorkshopListComponent } from './workshop/workshop-list.component';
import { WorkshopShowComponent } from './workshop/workshop-show.component';
import { WorkshopNewComponent } from './workshop/workshop-new.component';

import { InstitutionListComponent } from './institution/institution-list.component';
import { InstitutionShowComponent } from './institution/institution-show.component';
import { InstitutionNewComponent } from './institution/institution-new.component';

import { ConsortiumListComponent } from './consortium/consortium-list.component';
import { ConsortiumShowComponent } from './consortium/consortium-show.component';
import { ConsortiumNewComponent } from './consortium/consortium-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workshop', redirectTo: '/workshops', pathMatch: 'full' },
  { path: 'workshops', component: WorkshopListComponent },
  { path: 'workshops/:slug', component: WorkshopShowComponent },
  { path: 'workshop/new', component: WorkshopNewComponent },

  { path: 'institution', redirectTo: '/institutions', pathMatch: 'full' },
  { path: 'institutions', component: InstitutionListComponent },
  { path: 'institutions/:slug', component: InstitutionShowComponent },
  { path: 'institutions/:slug/workshops/new', component: WorkshopNewComponent },
  { path: 'institution/new', component: InstitutionNewComponent },

  { path: 'consortium', redirectTo: '/consortia', pathMatch: 'full' },
  { path: 'consortia', component: ConsortiumListComponent },
  { path: 'consortia/:slug', component: ConsortiumShowComponent },
  { path: 'consortium/new', component: ConsortiumNewComponent },

  { path: 'profile', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
