import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-stnd-display',
  templateUrl: './stnd-display.component.html',
  styleUrls: ['./stnd-display.component.scss']
})
export class StndDisplayComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
