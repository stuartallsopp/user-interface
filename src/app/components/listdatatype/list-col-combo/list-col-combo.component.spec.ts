import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColComboComponent } from './list-col-combo.component';

describe('ListColComboComponent', () => {
  let component: ListColComboComponent;
  let fixture: ComponentFixture<ListColComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
