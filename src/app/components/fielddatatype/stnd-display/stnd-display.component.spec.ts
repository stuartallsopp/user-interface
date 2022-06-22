import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StndDisplayComponent } from './stnd-display.component';

describe('StndDisplayComponent', () => {
  let component: StndDisplayComponent;
  let fixture: ComponentFixture<StndDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StndDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StndDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
