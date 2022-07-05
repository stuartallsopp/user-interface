import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SundryfieldOutlineComponent } from './sundryfield-outline.component';

describe('SundryfieldOutlineComponent', () => {
  let component: SundryfieldOutlineComponent;
  let fixture: ComponentFixture<SundryfieldOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SundryfieldOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SundryfieldOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
