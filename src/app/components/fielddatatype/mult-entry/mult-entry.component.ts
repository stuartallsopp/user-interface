import { Component, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-mult-entry',
  templateUrl: './mult-entry.component.html',
  styleUrls: ['./mult-entry.component.scss']
})
export class MultEntryComponent extends BaseComponent implements OnInit {

  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }


  override ngOnInit(): void {
    super.ngOnInit();
  }

}
