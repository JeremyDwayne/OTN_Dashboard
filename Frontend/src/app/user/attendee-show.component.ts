import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-attendee-show',
  templateUrl: './attendee-show.component.html',
  styleUrls: ['./attendee.component.sass']
})
export class AttendeeShowComponent implements OnInit {
  routeId: any;

  constructor(
    private http: Http,
    private userService: UserService
  ) { }

  @Input() attendee: any;
  @Input() id: number;

  ngOnInit() {
    this.userService.getUser(this.id).subscribe(response => this.attendee = response.json());
  }

}
