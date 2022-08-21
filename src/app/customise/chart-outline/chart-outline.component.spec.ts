import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOutlineComponent } from './chart-outline.component';

describe('ChartOutlineComponent', () => {
  let component: ChartOutlineComponent;
  let fixture: ComponentFixture<ChartOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOutlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
