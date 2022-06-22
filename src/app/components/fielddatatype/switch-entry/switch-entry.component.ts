import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-switch-entry',
  templateUrl: './switch-entry.component.html',
  styleUrls: ['./switch-entry.component.scss']
})
export class SwitchEntryComponent extends BaseComponent implements OnInit {

  constructor(ds:DataService) {
    super(ds);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
