import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryPeriodselectorComponent } from './enquiry-periodselector.component';

describe('EnquiryPeriodselectorComponent', () => {
  let component: EnquiryPeriodselectorComponent;
  let fixture: ComponentFixture<EnquiryPeriodselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryPeriodselectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryPeriodselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
