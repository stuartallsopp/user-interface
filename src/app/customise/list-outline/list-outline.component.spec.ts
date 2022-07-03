import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOutlineComponent } from './list-outline.component';

describe('ListOutlineComponent', () => {
  let component: ListOutlineComponent;
  let fixture: ComponentFixture<ListOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
