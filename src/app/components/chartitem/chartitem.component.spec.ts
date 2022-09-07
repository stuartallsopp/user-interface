import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartitemComponent } from './chartitem.component';

describe('ChartitemComponent', () => {
  let component: ChartitemComponent;
  let fixture: ComponentFixture<ChartitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
