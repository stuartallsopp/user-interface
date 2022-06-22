import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistEntryComponent } from './plist-entry.component';

describe('PlistEntryComponent', () => {
  let component: PlistEntryComponent;
  let fixture: ComponentFixture<PlistEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlistEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
