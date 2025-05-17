import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeCenterComponent } from './refuge-center.component';

describe('RefugeCenterComponent', () => {
  let component: RefugeCenterComponent;
  let fixture: ComponentFixture<RefugeCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefugeCenterComponent]
    });
    fixture = TestBed.createComponent(RefugeCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
