import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldpickerComponent } from './fieldpicker.component';

describe('FieldpickerComponent', () => {
  let component: FieldpickerComponent;
  let fixture: ComponentFixture<FieldpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldpickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
