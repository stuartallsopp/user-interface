import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingDialogComponent } from './posting-dialog.component';

describe('PostingDialogComponent', () => {
  let component: PostingDialogComponent;
  let fixture: ComponentFixture<PostingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
