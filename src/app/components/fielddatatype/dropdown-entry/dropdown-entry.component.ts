import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dropdown-entry',
  templateUrl: './dropdown-entry.component.html',
  styleUrls: ['./dropdown-entry.component.scss']
})
export class DropdownEntryComponent extends BaseComponent implements OnInit,OnChanges {

  private copy_of_original_value:any;
  public code_key:string="code";
  public options:any[]=[{id:0,description:'Not Set',code:'notset'}];
  public configs:any;
  public context_param:any;

  constructor(ds:DataService,event:NgEventBus,private loading:NgxUiLoaderService,private message:MessageService) {
    super(ds,event);
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

  override ngOnInit(): void {
    super.ngOnInit();
  }

 value_selected(event:any)
 {
  this.value_changed.emit(event.value);
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
          if (this.configs.id!=null)
          {
            this.data[this.definition.fieldname]=this.copy_of_original_value;
          }else
          {
            var check=this.options.filter(p=>p.id==this.copy_of_original_value.id)[0];
            if (check!=null)
            {
              this.data[this.definition.fieldname]=check;
            }
          }

      },100);
      this.loading.stopLoader(this.loader_key);
    },error:(error)=>{
      this.loading.stopLoader(this.loader_key);
      this.message.add({severity:'error',summary:'Loading Error',detail:error.message});
    }})
  }

}
