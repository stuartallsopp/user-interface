import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbaseComponent } from './listbase.component';

describe('ListbaseComponent', () => {
  let component: ListbaseComponent;
  let fixture: ComponentFixture<ListbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
