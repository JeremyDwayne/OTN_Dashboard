import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { WorkshopModule } from './workshop/workshop.module';
import { InstitutionModule } from './institution/institution.module';
import { ConsortiumModule } from './consortium/consortium.module';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationLinksComponent } from './authentication/authentication-links.component';
import { AuthenticationModule } from './authentication/authentication.module';


import { UserService } from './user/user.service';


import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';

import { SharedModule } from './shared/shared.module';
import { AlertService } from './shared/alert.service';
import { Filter } from './shared/filter.pipe';
import { LandingComponent } from './landing/landing.component';
import { UserInvitationsComponent } from './user/user-invitations.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationLinksComponent,
    DashboardComponent,
    Filter,
    LandingComponent,
    UserInvitationsComponent
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
    NgbModule.forRoot(),
    SharedModule,
    AuthenticationModule,
    WorkshopModule,
    InstitutionModule,
    ConsortiumModule,
  ],
  providers: [ 
    DashboardService,
    UserService,
    Angular2TokenService, 
    AuthenticationService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
