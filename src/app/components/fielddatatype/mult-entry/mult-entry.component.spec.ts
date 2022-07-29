import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultEntryComponent } from './mult-entry.component';

describe('MultEntryComponent', () => {
  let component: MultEntryComponent;
  let fixture: ComponentFixture<MultEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
