import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOutlineComponent } from './action-outline.component';

describe('ActionOutlineComponent', () => {
  let component: ActionOutlineComponent;
  let fixture: ComponentFixture<ActionOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
