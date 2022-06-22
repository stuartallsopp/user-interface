import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColDateComponent } from './list-col-date.component';

describe('ListColDateComponent', () => {
  let component: ListColDateComponent;
  let fixture: ComponentFixture<ListColDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
