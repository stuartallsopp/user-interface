import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColBooleanComponent } from './list-col-boolean.component';

describe('ListColBooleanComponent', () => {
  let component: ListColBooleanComponent;
  let fixture: ComponentFixture<ListColBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColBooleanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
