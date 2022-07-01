import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnOutlineComponent } from './column-outline.component';

describe('ColumnOutlineComponent', () => {
  let component: ColumnOutlineComponent;
  let fixture: ComponentFixture<ColumnOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
