import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Institution } from './institution';
import { InstitutionService } from './institution.service';
import { Workshop } from '../workshop/workshop';
import { WorkshopShowComponent } from '../workshop/workshop-show.component';

@Component({
  selector: 'app-institution-show',
  templateUrl: './institution-show.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionShowComponent implements OnInit {
  slug: string;
  routeId: any;
  attributes: any;
  workshopCount: number;
  isCollapsed: boolean = true;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private institutionService: InstitutionService
  ) { }

  @Input() institution: any;
  @Input() id: number;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.slug = params['slug'];
      }
    )
    let institutionRequest = this.route.params.flatMap((params: Params) =>
      this.institutionService.getInstitution(params['slug'], this.id));
    institutionRequest.subscribe(response => {
      this.institution = response.json();
      this.attributes = this.institution.data.attributes;
    });
  }

  goToWorkshopShow(workshop: Workshop): void {
    let workshopLink = ['/workshops', workshop.slug];
    this.router.navigate(workshopLink);
  }
}
