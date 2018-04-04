import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionListComponent implements OnInit {
  institutions: any;

  constructor(
    private institutionService: InstitutionService, 
    private router: Router
  ) { }

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getInstitutions());
  }

  getInstitutions() {
    this.institutionService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  }

  goToShow(institution: Institution): void {
    let institutionLink = ['/institutions', institution.slug];
    this.router.navigate(institutionLink);
  }

}
