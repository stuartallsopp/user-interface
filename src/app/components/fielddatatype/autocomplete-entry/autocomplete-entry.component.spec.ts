import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteEntryComponent } from './autocomplete-entry.component';

describe('AutocompleteEntryComponent', () => {
  let component: AutocompleteEntryComponent;
  let fixture: ComponentFixture<AutocompleteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
