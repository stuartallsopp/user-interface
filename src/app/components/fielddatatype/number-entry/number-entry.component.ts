import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-number-entry',
  templateUrl: './number-entry.component.html',
  styleUrls: ['./number-entry.component.scss']
})
export class NumberEntryComponent extends BaseComponent implements OnInit {

  constructor(ds:DataService) {
    super(ds);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  resolveMin():number
  {
    if (this.definition.format==null||this.definition.format==""){return 0;}
    if (this.definition.format.indexOf('.')<0){return 0;}
    if (this.definition.format.length<=this.definition.format.indexOf('.')-1){return 0;}
    var dec=this.definition.format.indexOf('.')+1;
    var remainder=this.definition.format.substring(dec);
    var hyp=remainder.indexOf('-');
    if (hyp<0){return parseInt(remainder)}
    var next=remainder.substring(hyp);
    return parseInt(remainder.replace(next,""));
  }

  resolveMax():number
  {
    if (this.definition.format==null||this.definition.format==""){return 0;}
    if (this.definition.format.indexOf('.')<0){return 0;}
    if (this.definition.format.length<=this.definition.format.indexOf('.')-1){return 0;}
    var dec=this.definition.format.indexOf('-')+1;
    if (dec==0){return 0;}
    var remainder=this.definition.format.substring(dec);
    return parseInt(remainder);
  }

}
