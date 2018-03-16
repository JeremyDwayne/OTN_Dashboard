import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';

@Component({
  selector: 'app-institution-new',
  templateUrl: './institution-new.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionNewComponent implements OnInit {
  institution = new Institution;
  submitted: boolean = false;

  constructor(private institutionService: InstitutionService) { }
  
  ngOnInit() {
    // let timer = Observable.timer(0, 25000);
    // timer.subscribe(() => this.getInstitutions());
  }

  createInstitution(institution: Institution) {
    this.submitted = true;
    this.institutionService.createInstitution(institution)
      .subscribe(
        data => { return true }, 
        error => { 
          console.log("Error creating institution" + error);
          return Observable.throw(error);
        });
  }

  // getInstitutions() {
  //   this.institutionService.getInstitutions().subscribe(institutions => this.institutions = institutions);
  // }

}
