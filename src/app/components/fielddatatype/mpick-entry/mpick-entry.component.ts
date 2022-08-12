import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-mpick-entry',
  templateUrl: './mpick-entry.component.html',
  styleUrls: ['./mpick-entry.component.scss']
})
export class MpickEntryComponent extends BaseComponent implements OnInit,OnChanges {

  constructor(ds:DataService,event:NgEventBus,private loading:NgxUiLoaderService,private message:MessageService) {
    super(ds,event);
   }

   private copy_of_original_value:any;
   public context_param:any;
   public configs:any;
   public code_key:string;
   public local_value:any;

   public options:any[]=[];

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'])
    {
     if (this.data!=null)
     {
       this.copy_of_original_value=this.data[this.definition.fieldname];
     }
     if (changes['definition'])
     {
       this.resolveParameters();
     }
    }
  }

  value_selected(event)
  {
    this.resolve_data_out();
  }

  resolve_data_out()
  {
    this.data[this.definition.fieldname]=this.local_value.toString();
    this.value_changed.emit(this.data[this.definition.fieldname]);
  }

  resolve_data_in()
  {
    var val=this.data[this.definition.fieldname];
    if (val==undefined||val==null){val='';}
    if (val==''){this.local_value=null;}else{
      this.local_value=val.split(",");
    }
  }

  resolveParameters()
  {
    if (this.definition.aut_config!=undefined&&this.definition.aut_config!=null)
    {
      this.configs=JSON.parse(this.definition.aut_config);
      if (this.configs.label!=undefined)
      {
        this.code_key=this.configs.label;
      }
    }
    if (this.definition.context_param!=undefined&&this.definition.context_param!=null)
    {
      this.context_param=JSON.parse(this.definition.context_param);
    }
    var url=this.definition.data_url;
    url=url.replace('{source_type}',this.source_type);
    this.loading.startLoader(this.loader_key);
    this.dataService.list(url,0,0,"id","asc",null,true).subscribe({next:(result:any)=>{
      this.options=[...result.records];
      if (this.context_param?.add!=undefined&&this.context_param?.add!=null)
      {
        this.options=this.options.concat(this.context_param.add);
      }
      setTimeout(()=>{
          this.local_value=this.copy_of_original_value;
          this.resolve_data_in();
      },100);
      this.loading.stopLoader(this.loader_key);
    },error:(error)=>{
      this.loading.stopLoader(this.loader_key);
      this.message.add({severity:'error',summary:'Loading Error',detail:error.message});
    }})
  }

}
