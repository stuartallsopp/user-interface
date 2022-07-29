import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlPrimaryComponent } from './mdl-primary.component';

describe('MdlPrimaryComponent', () => {
  let component: MdlPrimaryComponent;
  let fixture: ComponentFixture<MdlPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlPrimaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdlPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
