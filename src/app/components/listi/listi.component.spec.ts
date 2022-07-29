import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListiComponent } from './listi.component';

describe('ListiComponent', () => {
  let component: ListiComponent;
  let fixture: ComponentFixture<ListiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
