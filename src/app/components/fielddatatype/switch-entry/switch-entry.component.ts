import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-switch-entry',
  templateUrl: './switch-entry.component.html',
  styleUrls: ['./switch-entry.component.scss']
})
export class SwitchEntryComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
