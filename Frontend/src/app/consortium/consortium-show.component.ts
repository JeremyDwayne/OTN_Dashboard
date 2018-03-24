import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Consortium } from './consortium';
import { Institution } from '../institution/institution';
import { InstitutionShowComponent } from '../institution/institution-show.component';
import { ConsortiumService } from './consortium.service';

@Component({
  selector: 'app-consortium-show',
  templateUrl: './consortium-show.component.html',
  styleUrls: ['./consortium.component.sass']
})
export class ConsortiumShowComponent implements OnInit {
  id: number;
  slug: string;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private consortiumService: ConsortiumService
  ) { }

  @Input() consortium: Consortium;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.slug = params['slug'];
        this.id = params['id'];
      }
    )
    let consortiumRequest = this.route.params.flatMap((params: Params) =>
      this.consortiumService.getConsortium(params['slug'], null));
    consortiumRequest.subscribe(response => this.consortium = response.json());
  }

  goToInstitutionShow(institution: Institution): void {
    let institutionLink = ['/institutions', institution.slug];
    this.router.navigate(institutionLink);
  }

}
