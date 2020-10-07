import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTrackingComponent } from './actions-tracking.component';

describe('ActionsTrackingComponent', () => {
  let component: ActionsTrackingComponent;
  let fixture: ComponentFixture<ActionsTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
