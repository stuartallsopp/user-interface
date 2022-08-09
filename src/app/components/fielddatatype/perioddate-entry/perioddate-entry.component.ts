import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-perioddate-entry',
  templateUrl: './perioddate-entry.component.html',
  styleUrls: ['./perioddate-entry.component.scss']
})
export class PerioddateEntryComponent extends BaseComponent implements OnInit,OnChanges {


  public perioddefinition:any;
  public datedefinition:any;
  constructor(ds:DataService,event:NgEventBus,public responsive:ResponsiveService) {
    super(ds,event);
   }

   override ngOnChanges(changes: SimpleChanges): void {
     super.ngOnChanges(changes);
      if (changes['definition'])
      {
          this.resolveDefinition();
      }
   }

   resolveDefinition()
   {
    var fields=this.definition.fieldname.split(',');
    this.perioddefinition={
      label:'Period',
      fieldname:fields[1],
      data_url:this.definition.data_url,
      aut_config: '{"label":"description","id":"id"}',
      data_url_param:'{"search":"period_index","order":"period_index"}',
      data_url_method:'POST'
    };
    this.datedefinition={label:'Date',fieldname:fields[0],format:this.definition.format}
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
