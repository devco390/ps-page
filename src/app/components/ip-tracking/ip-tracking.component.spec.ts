import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpTrackingComponent } from './ip-tracking.component';

describe('IpTrackingComponent', () => {
  let component: IpTrackingComponent;
  let fixture: ComponentFixture<IpTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
