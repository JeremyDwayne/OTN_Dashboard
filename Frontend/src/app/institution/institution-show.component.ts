import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';

@Component({
  selector: 'app-institution-show',
  templateUrl: './institution-show.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionShowComponent implements OnInit {
  id: number;
  slug: string;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private institutionService: InstitutionService
  ) { }

  @Input() institution: Institution;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.slug = params['slug'];
      }
    )
    let institutionRequest = this.route.params.flatMap((params: Params) =>
      this.institutionService.getInstitution(params['slug']));
    institutionRequest.subscribe(response => this.institution = response.json());
  }

}
