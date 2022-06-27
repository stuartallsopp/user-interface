import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSingleSearchComponent } from './ac-single-search.component';

describe('AcSingleSearchComponent', () => {
  let component: AcSingleSearchComponent;
  let fixture: ComponentFixture<AcSingleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcSingleSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcSingleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
