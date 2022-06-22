import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss']
})
export class TextEntryComponent extends BaseComponent implements OnInit {


  constructor() { 
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
