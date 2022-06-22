import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColNumberComponent } from './list-col-number.component';

describe('ListColNumberComponent', () => {
  let component: ListColNumberComponent;
  let fixture: ComponentFixture<ListColNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
