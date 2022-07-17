import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyexchangeEntryComponent } from './currencyexchange-entry.component';

describe('CurrencyexchangeEntryComponent', () => {
  let component: CurrencyexchangeEntryComponent;
  let fixture: ComponentFixture<CurrencyexchangeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyexchangeEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyexchangeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
