import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActioncustomOutlineComponent } from './actioncustom-outline.component';

describe('ActioncustomOutlineComponent', () => {
  let component: ActioncustomOutlineComponent;
  let fixture: ComponentFixture<ActioncustomOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActioncustomOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActioncustomOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
