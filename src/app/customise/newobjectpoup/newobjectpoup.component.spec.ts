import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewobjectpoupComponent } from './newobjectpoup.component';

describe('NewobjectpoupComponent', () => {
  let component: NewobjectpoupComponent;
  let fixture: ComponentFixture<NewobjectpoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewobjectpoupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewobjectpoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
