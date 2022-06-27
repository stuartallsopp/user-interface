import { Component, Input, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss']
})
export class TextEntryComponent extends BaseComponent implements OnInit {


  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
