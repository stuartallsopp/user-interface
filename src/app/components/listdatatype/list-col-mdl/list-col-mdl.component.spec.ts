import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColMdlComponent } from './list-col-mdl.component';

describe('ListColMdlComponent', () => {
  let component: ListColMdlComponent;
  let fixture: ComponentFixture<ListColMdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColMdlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColMdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
