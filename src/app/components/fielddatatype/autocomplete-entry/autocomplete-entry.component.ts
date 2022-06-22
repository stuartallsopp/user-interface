import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-autocomplete-entry',
  templateUrl: './autocomplete-entry.component.html',
  styleUrls: ['./autocomplete-entry.component.scss']
})
export class AutocompleteEntryComponent extends BaseComponent implements OnInit,OnChanges {

  public search_results:any[]=[];

  private copy_list:any[]=[];
  public working_list:any[]=[];
  public currentitem:any=null;

  public configs:any=null;

  constructor(private dataService:DataService) {
    super();
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'])
    {
      this.working_list=[...this.data[this.definition.fieldname]];
      this.working_list.sort((a,b)=>b.system_compulsory-a.system_compulsory);
      this.copy_list=[...this.data[this.definition.fieldname]];
    }
    if (changes['definition'])
    {
      if (this.definition.aut_config)
      {
        this.configs=JSON.parse(this.definition.aut_config);
      }
    }
  }

  contentChanged()
  {
    this.updatesource();
  }

  search(event:any)
  {
    var url=this.definition.data_url;
    var params=JSON.parse(this.definition.data_url_param);
    console.log(params,event);
    for(var item of params)
    {
      if (item=="search"){
        url=url.replace("{search}",event.query);
      }else
      {
        url=url.replace("{"+item+"}",this.data[item]);
      }
    }
    this.dataService.get(url).subscribe({next:(result:any)=>{
      this.search_results=result;
    }})
  }

  remove(value:any)
  {
    if (value.system_compulsory==1)
    {
      this.working_list=[...this.data[this.definition.fieldname]];
    }
    this.updatesource();
  }


  updatesource()
  {
    this.data[this.definition.fieldname]=this.working_list;
    console.log(this.data);
  }

  open(value:any)
  {
    this.currentitem=value;
  }

  swap(value:any,type:string)
  {
    value[type]=!value[type];
    this.updatesource();
  }

}
