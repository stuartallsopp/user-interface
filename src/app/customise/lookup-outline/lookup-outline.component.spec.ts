import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupOutlineComponent } from './lookup-outline.component';

describe('LookupOutlineComponent', () => {
  let component: LookupOutlineComponent;
  let fixture: ComponentFixture<LookupOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
