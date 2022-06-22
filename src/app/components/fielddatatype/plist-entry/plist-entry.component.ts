import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-plist-entry',
  templateUrl: './plist-entry.component.html',
  styleUrls: ['./plist-entry.component.scss']
})
export class PlistEntryComponent extends BaseComponent implements OnInit,OnChanges {


  public content:any[]=[];
  constructor() {
    super();
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
