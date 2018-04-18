import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkshopListComponent } from './workshop-list.component';
import { WorkshopShowComponent } from './workshop-show.component';
import { WorkshopEventComponent } from './workshop-event.component';
import { WorkshopNewComponent  } from './workshop-new.component';
import { WorkshopEditComponent  } from './workshop-edit.component';
import { WorkshopInvitationsComponent  } from './workshop-invitations.component';
import { WorkshopService       } from './workshop.service';

const routes: Routes = [
  { path: 'workshop', redirectTo: '/workshops', pathMatch: 'full' },
  { path: 'workshops', component: WorkshopListComponent },
  { path: 'workshops/:slug', component: WorkshopEventComponent },
  { path: 'workshops/:slug/edit', component: WorkshopEditComponent },
  { path: 'workshops/:slug/invitations', component: WorkshopInvitationsComponent },
  // { path: 'workshop/new', component: WorkshopNewComponent },
  { path: 'institutions/:slug/workshops/new', component: WorkshopNewComponent, pathMatch: 'full' },
  { path: 'institutions/:slug/workshops/:id/edit', component: WorkshopEditComponent, pathMatch: 'full' },
  { path: 'institutions/:slug/workshops/:id/invitations', component: WorkshopInvitationsComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ WorkshopService ]
})
export class WorkshopRoutingModule {}

