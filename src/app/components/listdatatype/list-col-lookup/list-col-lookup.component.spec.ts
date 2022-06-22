import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColLookupComponent } from './list-col-lookup.component';

describe('ListColLookupComponent', () => {
  let component: ListColLookupComponent;
  let fixture: ComponentFixture<ListColLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
