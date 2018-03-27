import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkshopShowComponent } from '../workshop/workshop-show.component';

import { InstitutionListComponent } from './institution-list.component';
import { InstitutionShowComponent } from './institution-show.component';
import { InstitutionNewComponent  } from './institution-new.component';
import { InstitutionEditComponent  } from './institution-edit.component';
import { InstitutionService       } from './institution.service';

const routes: Routes = [
  { path: 'institution', redirectTo: '/institutions', pathMatch: 'full' },
  // { path: 'institutions', component: InstitutionListComponent },
  { path: 'institutions/:slug', component: InstitutionShowComponent },
  { path: 'institutions/:slug/edit', component: InstitutionEditComponent },
  { path: 'consortia/:slug/institutions/new', component: InstitutionNewComponent, pathMatch: 'full' },
  { path: 'consortia/:slug/institutions/:id/edit', component: InstitutionEditComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ InstitutionService ]
})
export class InstitutionRoutingModule {}

