import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteviewComponent } from './noteview.component';

describe('NoteviewComponent', () => {
  let component: NoteviewComponent;
  let fixture: ComponentFixture<NoteviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
