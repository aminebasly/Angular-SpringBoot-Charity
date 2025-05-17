import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDonComponent } from './update-don.component';

describe('UpdateDonComponent', () => {
  let component: UpdateDonComponent;
  let fixture: ComponentFixture<UpdateDonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDonComponent]
    });
    fixture = TestBed.createComponent(UpdateDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
