import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Consortium } from './consortium';
import { ConsortiumService } from './consortium.service';

@Component({
  selector: 'app-consortium-list',
  templateUrl: './consortium-list.component.html',
  styleUrls: ['./consortium.component.sass']
})
export class ConsortiumListComponent implements OnInit {
  consortia: any;

  constructor(
    private consortiumService: ConsortiumService, 
    private router: Router,
  ) { }

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getConsortia());
  }

  getConsortia() {
    this.consortiumService.getConsortia().subscribe(consortia => this.consortia = consortia);
  }

  goToShow(consortium: Consortium): void {
    let consortiumLink = ['/consortia', consortium.slug];
    this.router.navigate(consortiumLink);
  }

}
