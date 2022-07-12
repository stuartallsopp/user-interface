import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerioddateEntryComponent } from './perioddate-entry.component';

describe('PerioddateEntryComponent', () => {
  let component: PerioddateEntryComponent;
  let fixture: ComponentFixture<PerioddateEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerioddateEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerioddateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
