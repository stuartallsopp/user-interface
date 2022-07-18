import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownEntryComponent } from './dropdown-entry.component';

describe('DropdownEntryComponent', () => {
  let component: DropdownEntryComponent;
  let fixture: ComponentFixture<DropdownEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
