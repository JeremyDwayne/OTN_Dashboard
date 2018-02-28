import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WorkshopListComponent } from './workshop/workshop-list.component';
import { WorkshopShowComponent } from './workshop/workshop-show.component';
import { WorkshopService } from './workshop/workshop.service';
import { UserComponent } from './user/user.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthLinksComponent } from './authentication/auth-links.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2TokenService } from 'angular2-token';


@NgModule({
  declarations: [
    AppComponent,
    WorkshopListComponent,
    WorkshopShowComponent,
    UserComponent,
    AuthLinksComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [ 
    WorkshopService, 
    Angular2TokenService, 
    AuthenticationService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
