import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColTagComponent } from './list-col-tag.component';

describe('ListColTagComponent', () => {
  let component: ListColTagComponent;
  let fixture: ComponentFixture<ListColTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
