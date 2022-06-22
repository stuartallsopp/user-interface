import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSingleEntryComponent } from './ac-single-entry.component';

describe('AcSingleEntryComponent', () => {
  let component: AcSingleEntryComponent;
  let fixture: ComponentFixture<AcSingleEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcSingleEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcSingleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
