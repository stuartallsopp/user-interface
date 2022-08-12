import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpickEntryComponent } from './mpick-entry.component';

describe('MpickEntryComponent', () => {
  let component: MpickEntryComponent;
  let fixture: ComponentFixture<MpickEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpickEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpickEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
