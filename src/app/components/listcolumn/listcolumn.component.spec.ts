import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcolumnComponent } from './listcolumn.component';

describe('ListcolumnComponent', () => {
  let component: ListcolumnComponent;
  let fixture: ComponentFixture<ListcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcolumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
