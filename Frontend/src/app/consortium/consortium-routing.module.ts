import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstitutionShowComponent } from '../institution/institution-show.component';

import { ConsortiumListComponent } from './consortium-list.component';
import { ConsortiumShowComponent } from './consortium-show.component';
import { ConsortiumNewComponent  } from './consortium-new.component';
import { ConsortiumEditComponent  } from './consortium-edit.component';
import { ConsortiumService       } from './consortium.service';

const routes: Routes = [
  { path: 'consortium', redirectTo: '/consortia', pathMatch: 'full' },
  // { path: 'consortia', component: ConsortiumListComponent },
  { path: 'consortia/:slug', component: ConsortiumShowComponent },
  { path: 'consortia/:slug/edit', component: ConsortiumEditComponent },
  { path: 'consortium/new', component: ConsortiumNewComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ ConsortiumService ]
})
export class ConsortiumRoutingModule {}

