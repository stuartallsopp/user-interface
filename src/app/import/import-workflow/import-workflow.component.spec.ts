import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWorkflowComponent } from './import-workflow.component';

describe('ImportWorkflowComponent', () => {
  let component: ImportWorkflowComponent;
  let fixture: ComponentFixture<ImportWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
