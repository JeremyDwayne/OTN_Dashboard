import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng5BreadcrumbModule, BreadcrumbService } from 'ng5-breadcrumb';

import { ConsortiumRoutingModule } from './consortium-routing.module';

import { InstitutionModule } from '../institution/institution.module';

import { ConsortiumListComponent } from './consortium-list.component';
import { ConsortiumShowComponent } from './consortium-show.component';
import { ConsortiumNewComponent  } from './consortium-new.component';
import { ConsortiumEditComponent  } from './consortium-edit.component';
import { ConsortiumService       } from './consortium.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    Ng5BreadcrumbModule.forRoot(),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    ConsortiumRoutingModule,
    InstitutionModule,
    SharedModule
  ],
  declarations: [
    ConsortiumListComponent,
    ConsortiumShowComponent,
    ConsortiumNewComponent,
    ConsortiumEditComponent,
  ],
  providers: [
    ConsortiumService
  ],
  exports: [ ] 
})
export class ConsortiumModule { }
