import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-stnd-display',
  templateUrl: './stnd-display.component.html',
  styleUrls: ['./stnd-display.component.scss']
})
export class StndDisplayComponent extends BaseComponent implements OnInit {

  constructor(ds:DataService) {
    super(ds);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
