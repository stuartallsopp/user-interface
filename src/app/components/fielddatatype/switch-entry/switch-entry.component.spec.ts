import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchEntryComponent } from './switch-entry.component';

describe('SwitchEntryComponent', () => {
  let component: SwitchEntryComponent;
  let fixture: ComponentFixture<SwitchEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
