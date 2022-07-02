import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOutlineComponent } from './panel-outline.component';

describe('PanelOutlineComponent', () => {
  let component: PanelOutlineComponent;
  let fixture: ComponentFixture<PanelOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
