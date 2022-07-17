import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlEntryComponent } from './mdl-entry.component';

describe('MdlEntryComponent', () => {
  let component: MdlEntryComponent;
  let fixture: ComponentFixture<MdlEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdlEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
