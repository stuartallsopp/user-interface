import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValEntryComponent } from './val-entry.component';

describe('ValEntryComponent', () => {
  let component: ValEntryComponent;
  let fixture: ComponentFixture<ValEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
