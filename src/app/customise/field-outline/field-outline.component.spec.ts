import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOutlineComponent } from './field-outline.component';

describe('FieldOutlineComponent', () => {
  let component: FieldOutlineComponent;
  let fixture: ComponentFixture<FieldOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
