import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslimonialListComponent } from './teslimonial-list.component';

describe('TeslimonialListComponent', () => {
  let component: TeslimonialListComponent;
  let fixture: ComponentFixture<TeslimonialListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeslimonialListComponent]
    });
    fixture = TestBed.createComponent(TeslimonialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
