import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryFilterComponent } from './enquiry-filter.component';

describe('EnquiryFilterComponent', () => {
  let component: EnquiryFilterComponent;
  let fixture: ComponentFixture<EnquiryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
