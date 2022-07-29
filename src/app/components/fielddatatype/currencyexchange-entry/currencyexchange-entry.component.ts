import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-currencyexchange-entry',
  templateUrl: './currencyexchange-entry.component.html',
  styleUrls: ['./currencyexchange-entry.component.scss']
})
export class CurrencyexchangeEntryComponent extends BaseComponent implements OnInit,OnChanges {



  public currencydefinition:any;
  public ratedefinition:any;

  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
     if (changes['definition'])
     {
         this.resolveDefinition();
     }
  }

  currency_changed(event:any)
  {
    var fields=this.definition.fieldname.split(',');
    this.data[fields[1]]=event.rate;
  }

  rate_changed(event:any)
  {
    
  }

  override setValue(value: any): void {
    var fields=this.definition.fieldname.split(',');
    this.data[fields[0]]=value;
    this.currency_changed(value);
  }

  resolveDefinition()
  {
   var fields=this.definition.fieldname.split(',');
   this.currencydefinition={
     label:'Currency',
     fieldname:fields[0],
     data_url:this.definition.data_url,
     aut_config: '{"label":"code","id":"id"}',
     data_url_param:'{"search":"code","order":"code"}',
     data_url_method:'POST'
   };
   this.ratedefinition={label:'Rate',fieldname:fields[1],format:this.definition.format}
  }

}
