import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng5BreadcrumbModule, BreadcrumbService } from 'ng5-breadcrumb';

import { AppComponent } from './app.component';

import { WorkshopListComponent } from './workshop/workshop-list.component';
import { WorkshopShowComponent } from './workshop/workshop-show.component';
import { WorkshopNewComponent } from './workshop/workshop-new.component';
import { WorkshopService } from './workshop/workshop.service';

import { InstitutionListComponent } from './institution/institution-list.component';
import { InstitutionShowComponent } from './institution/institution-show.component';
import { InstitutionNewComponent } from './institution/institution-new.component';
import { InstitutionService } from './institution/institution.service';

import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthLinksComponent } from './authentication/auth-links.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    WorkshopListComponent,
    WorkshopShowComponent,
    WorkshopNewComponent,
    InstitutionListComponent,
    InstitutionShowComponent,
    InstitutionNewComponent,
    UserComponent,
    AuthLinksComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    Ng5BreadcrumbModule.forRoot(),
    NgbModule.forRoot(),
    SharedModule,
    AuthenticationModule
  ],
  providers: [ 
    WorkshopService, 
    InstitutionService, 
    UserService,
    Angular2TokenService, 
    BreadcrumbService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
