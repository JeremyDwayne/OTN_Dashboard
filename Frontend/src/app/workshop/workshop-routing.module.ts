import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkshopListComponent } from './workshop-list.component';
import { WorkshopShowComponent } from './workshop-show.component';
import { WorkshopEventComponent } from './workshop-event.component';
import { WorkshopNewComponent  } from './workshop-new.component';
import { WorkshopService       } from './workshop.service';

const routes: Routes = [
  { path: 'workshop', redirectTo: '/workshops', pathMatch: 'full' },
  { path: 'workshops', component: WorkshopListComponent },
  { path: 'workshops/:slug', component: WorkshopEventComponent },
  // { path: 'workshop/new', component: WorkshopNewComponent },
  { path: 'institutions/:slug/workshops/new', component: WorkshopNewComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ WorkshopService ]
})
export class WorkshopRoutingModule {}
