import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopInvitationsComponent } from './workshop-invitations.component';

describe('WorkshopInvitationsComponent', () => {
  let component: WorkshopInvitationsComponent;
  let fixture: ComponentFixture<WorkshopInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
