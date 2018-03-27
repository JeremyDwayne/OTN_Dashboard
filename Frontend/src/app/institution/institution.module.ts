import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng5BreadcrumbModule, BreadcrumbService } from 'ng5-breadcrumb';

import { InstitutionRoutingModule } from './institution-routing.module';

import { WorkshopModule } from '../workshop/workshop.module';

import { InstitutionListComponent } from './institution-list.component';
import { InstitutionShowComponent } from './institution-show.component';
import { InstitutionNewComponent  } from './institution-new.component';
import { InstitutionService       } from './institution.service';
import { InstitutionFormComponent } from './institution-form.component';
import { InstitutionEditComponent } from './institution-edit.component';

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
    InstitutionRoutingModule,
    WorkshopModule,
    SharedModule
  ],
  declarations: [
    InstitutionListComponent,
    InstitutionShowComponent,
    InstitutionNewComponent,
    InstitutionEditComponent,
    InstitutionFormComponent
  ],
  providers: [
    InstitutionService
  ],
  exports: [
    InstitutionShowComponent
  ] 
})
export class InstitutionModule { }
