import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { WorkshopRoutingModule } from './workshop-routing.module';


import { AttendeeShowComponent } from '../user/attendee-show.component';

import { WorkshopListComponent } from './workshop-list.component';
import { WorkshopShowComponent } from './workshop-show.component';
import { WorkshopEventComponent } from './workshop-event.component';
import { WorkshopNewComponent  } from './workshop-new.component';
import { WorkshopEditComponent  } from './workshop-edit.component';
import { WorkshopService       } from './workshop.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    WorkshopRoutingModule,
    SharedModule
  ],
  declarations: [
    WorkshopListComponent,
    WorkshopShowComponent,
    WorkshopEventComponent,
    WorkshopNewComponent,
    WorkshopEditComponent,
    AttendeeShowComponent
  ],
  providers: [
    WorkshopService
  ],
  exports: [
    WorkshopShowComponent
  ] 
})
export class WorkshopModule { }
