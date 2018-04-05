import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng5BreadcrumbModule, BreadcrumbService } from 'ng5-breadcrumb';

import { NgxHttpBatcherModule, HttpBatchConfiguration, 
         HttpBatchConfigurationCollection, HttpBatcher } from 'ngx-http-batcher';

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

// Exported function so that HttpBatchConfigurationCollection can be used as in DI.
// Having this as an exported function enabled AOT complication as well :-)
export function httpBatchConfigurationFactory() {
  return new HttpBatchConfigurationCollection([
    // this is a basic configuration object see [Configuration Object Options]
    // for more information on all the options
    new HttpBatchConfiguration({
      rootEndpointUrl: "http://localhost:3000/api/v1/",
      batchEndpointUrl: "http://localhost:3000/api/v1/batch_sequential"
    })]);
};

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationLinksComponent,
    DashboardComponent,
    Filter
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
    AuthenticationModule,
    WorkshopModule,
    InstitutionModule,
    ConsortiumModule,
    // NgxHttpBatcherModule
  ],
  providers: [ 
    DashboardService,
    UserService,
    Angular2TokenService, 
    BreadcrumbService,
    AuthenticationService,
    AlertService
    // { provide: HttpBatchConfigurationCollection, useFactory: httpBatchConfigurationFactory },
    // { provide: Http, useClass: HttpBatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
