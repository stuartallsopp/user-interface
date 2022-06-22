import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberEntryComponent } from './number-entry.component';

describe('NumberEntryComponent', () => {
  let component: NumberEntryComponent;
  let fixture: ComponentFixture<NumberEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
