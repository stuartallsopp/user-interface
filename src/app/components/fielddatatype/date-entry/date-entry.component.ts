import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-date-entry',
  templateUrl: './date-entry.component.html',
  styleUrls: ['./date-entry.component.scss']
})
export class DateEntryComponent extends BaseComponent implements OnInit {

  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
