import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { InputText } from 'primeng/inputtext';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-ac-single-entry',
  templateUrl: './ac-single-entry.component.html',
  styleUrls: ['./ac-single-entry.component.scss']
})
export class AcSingleEntryComponent extends BaseComponent implements OnInit,OnChanges,AfterViewInit {


  public configs:any=null;

  @Input() parentdata:any;

  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }
  ngAfterViewInit(): void {

  }

  clearentry()
  {
    if (this.data==undefined||this.data==null){return;}
    if (this.definition.fieldname=='.')
    {
      this.data=null;
    }else
    {
      this.data[this.definition.fieldname]=null;
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override redraw(data: any): void {
    super.redraw(data);
    this.updatesource(data);
  }


  item_selected_on_list(event:any)
  {
    this.updatesource(event);
  }

  resolveDisplay()
  {
    if (this.data==undefined||this.data==null){return null;}
    if (this.definition.fieldname=='.')
    {
      if (this.data[this.configs.label]==undefined){return null;}
      return this.data[this.configs.label];
    }else
    {
      if (this.data[this.definition.fieldname])
      {
        return this.data[this.definition.fieldname][this.configs.label];
      }else
      {
        return null;
      }
    }
  }





  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['definition'])
    {
      if (this.definition.aut_config)
      {
        this.configs=JSON.parse(this.definition.aut_config);
      }
      this.checkInitialise();
    }
  }

  checkInitialise()
  {
    if (this.definition.initialise_url)
    {
      this.dataService.get(this.definition.initialise_url).subscribe(
        {next:(result)=>{
         // this.blank_data=result;
          this.checkDataState();
        }}
      )
    }
  }

  checkDataState()
  {
    if (this.definition.fieldname=='.' && (this.data==null))
    {
     // this.updatesource(this.blank_data);
    }
  }

  new_record(op:OverlayPanel)
  {
    var source_key="";
    if (this.field_configs!=undefined)
    {
      if (this.field_configs.source_type!=undefined)
      {
        source_key=this.data[this.field_configs.source_type];
      }
    }
   // return;
    var check=this.definition.actions?.filter((p: { key: string; })=>p.key=="new_record")[0];
    this.event.cast('top',{from:this.unique_id,action:'dialog',key:check.dialog_key,id:0,source_type:source_key,cache:null,row:-1,content:null});
    op.hide();
  }

  hasnewbutton():boolean
  {
    var check=this.definition.actions?.filter((p: { key: string; })=>p.key=="new_record")[0];
    if (check!=null){return true;}
    return false;
  }

  updatesource(event:any)
  {
    if (this.definition.fieldname=='.')
    {
      super.raise_value_changed(event);
    }
    else
    {
      this.data[this.definition.fieldname]=event;
      super.raise_value_changed(this.data[this.definition.fieldname])
    }
  }

}
