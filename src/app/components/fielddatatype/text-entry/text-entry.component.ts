import { DOCUMENT } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { InputText } from 'primeng/inputtext';
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
