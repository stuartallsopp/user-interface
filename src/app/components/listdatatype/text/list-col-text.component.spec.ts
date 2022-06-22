import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColTextComponent } from './list-col-text.component';

describe('ListColNumberComponent', () => {
  let component: ListColTextComponent;
  let fixture: ComponentFixture<ListColTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
