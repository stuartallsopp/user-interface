import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-val-entry',
  templateUrl: './val-entry.component.html',
  styleUrls: ['./val-entry.component.scss']
})
export class ValEntryComponent extends BaseComponent implements OnInit,OnChanges {

  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }

   public gross_entry:boolean=false;
   public net_definition:any;
   public tax_code_definition:any;
   public tax_rate_definition:any;
   public tax_definition:any;
   public gross_definition:any;

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

  gross_net_toggle()
  {
    this.resolveDefinition();
  }

  net_changed(event)
  {
    this.calculate();
  }

  tax_changed(event)
  {
    this.calculate(true);
  }

  rate_changed(event)
  {
    this.data['tax_rate']=event.rate;
    if (this.data['tax_rate']==undefined||this.data['tax_rate']==null)
    {
      this.data['tax_rate']=0;
    }
    this.calculate();
  }

  calculate(do_not_calc_tax:boolean=false)
  {
    if (this.gross_entry==false)
    {
      if (do_not_calc_tax==false)
      {
        this.data['tax']=(this.data['net']*(this.data['tax_rate']/100)).toFixed(2);
      }
      this.data['gross']=Number(this.data['net'])+Number(this.data['tax']);
    }else
    {
      if (do_not_calc_tax==false)
      {
        this.data['tax']=((this.data['gross']/(100+this.data['tax_rate']))*this.data['tax_rate']).toFixed(2);
      }
      this.data['net']=Number(this.data['gross'])-Number(this.data['tax']);
    }
  }

  resolveDefinition()
  {
    this.net_definition={fieldname:'net',format:this.definition.format,label:'Net',disable_on:this.gross_entry?'E,I':''};
    this.tax_rate_definition={fieldname:'tax_rate',format:this.definition.format,label:'Rate',disable_on:'E,I',suffix:'%'};
    this.tax_definition={fieldname:'tax',format:this.definition.format,label:'Tax'};
    this.gross_definition={fieldname:'gross',format:this.definition.format,label:'Gross',disable_on:this.gross_entry?'':'E,I'};
    this.tax_code_definition={
      label:'Tax Code',
      fieldname:'taxcode',
      data_url:this.definition.data_url,
      data_url_param:'{"search":"code","order":"code"}',
      aut_config:'{"label":"code","id":null}',
      context_param:'{"add":[{"id":0,"code":"notset","description":"Not Set"}]}',
      data_url_method:'POST'
    };
  }
}
