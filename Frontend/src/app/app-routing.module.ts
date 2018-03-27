import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

import { ConsortiumListComponent } from './consortium/consortium-list.component';
import { ConsortiumShowComponent } from './consortium/consortium-show.component';
import { ConsortiumNewComponent } from './consortium/consortium-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'consortium', redirectTo: '/consortia', pathMatch: 'full' },
  { path: 'consortia', component: ConsortiumListComponent, pathMatch: 'full' },
  { path: 'consortia/:slug', component: ConsortiumShowComponent, pathMatch: 'full' },
  { path: 'consortia/new', component: ConsortiumNewComponent, pathMatch: 'full' },
  { path: 'profile', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
