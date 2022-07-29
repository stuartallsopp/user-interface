import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColLinkComponent } from './list-col-link.component';

describe('ListColLinkComponent', () => {
  let component: ListColLinkComponent;
  let fixture: ComponentFixture<ListColLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
