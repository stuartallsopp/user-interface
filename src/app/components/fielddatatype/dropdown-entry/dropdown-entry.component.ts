import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  public options:any[]=[];
  public configs:any;

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

  resolveParameters()
  {
    console.log(this.definition);
    this.configs=JSON.parse(this.definition.aut_config);
    var url=this.definition.data_url;
    url=url.replace('{source_type}',this.source_type);
    this.loading.startLoader(this.loader_key);
    this.dataService.list(url,0,0,"id","asc").subscribe({next:(result:any)=>{
      this.options=[...result.records];
      this.options.push({id:0,description:'Not Set'});
      this.loading.stopLoader(this.loader_key);
    },error:(error)=>{
      this.loading.stopLoader(this.loader_key);
      this.message.add({severity:'error',summary:'Loading Error',detail:error.message});
    }})
  }

}
