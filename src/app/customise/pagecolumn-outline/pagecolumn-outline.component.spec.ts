import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecolumnOutlineComponent } from './pagecolumn-outline.component';

describe('PagecolumnOutlineComponent', () => {
  let component: PagecolumnOutlineComponent;
  let fixture: ComponentFixture<PagecolumnOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagecolumnOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagecolumnOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
