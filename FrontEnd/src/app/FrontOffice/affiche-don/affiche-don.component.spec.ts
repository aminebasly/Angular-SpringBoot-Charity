import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheDonComponent } from './affiche-don.component';

describe('AfficheDonComponent', () => {
  let component: AfficheDonComponent;
  let fixture: ComponentFixture<AfficheDonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficheDonComponent]
    });
    fixture = TestBed.createComponent(AfficheDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
