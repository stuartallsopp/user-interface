import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-plist-entry',
  templateUrl: './plist-entry.component.html',
  styleUrls: ['./plist-entry.component.scss']
})
export class PlistEntryComponent extends BaseComponent implements OnInit,OnChanges {


  public content:any[]=[];
  constructor(ds:DataService) {
    super(ds);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['definition'])
    {
      if (this.definition.lookup?.content)
      {
        console.log(this.definition);
        this.content=JSON.parse(this.definition.lookup.content);
      }
    }
  }

}
