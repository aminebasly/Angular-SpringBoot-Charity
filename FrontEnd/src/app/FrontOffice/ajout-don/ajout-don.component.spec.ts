import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDonComponent } from './ajout-don.component';

describe('AjoutDonComponent', () => {
  let component: AjoutDonComponent;
  let fixture: ComponentFixture<AjoutDonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutDonComponent]
    });
    fixture = TestBed.createComponent(AjoutDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
