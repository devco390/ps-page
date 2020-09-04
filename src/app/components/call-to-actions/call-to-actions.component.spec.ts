import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionsComponent } from './call-to-actions.component';

describe('CallToActionsComponent', () => {
  let component: CallToActionsComponent;
  let fixture: ComponentFixture<CallToActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
