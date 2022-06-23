import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-ac-single-entry',
  templateUrl: './ac-single-entry.component.html',
  styleUrls: ['./ac-single-entry.component.scss']
})
export class AcSingleEntryComponent extends BaseComponent implements OnInit,OnChanges {


  public configs:any=null;
  public search_results:any[]=[];

  constructor(ds:DataService) {
    super(ds);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  search(event:any)
  {
      if (this.definition.data_url_method=="GET")
      {
        this.search_get(event.query);
      }
      if (this.definition.data_url_method=="POST")
      {
        this.search_post(event.query);
      }
  }

  search_post(query:string)
  {
      console.log('post',query);
      var search_param=JSON.parse(this.definition.data_url_param);

      var search:any[]=[];
      if (search_param.search)
      {
        search.push({type:"begins","column":search_param.search,"value":query});
      }

      this.dataService.list(this.definition.data_url,0,0,"id","asc",search).subscribe(
        {
          next:(result:any)=>{
            this.search_results=result.records;
          }
        }
      )
  }

  search_get(query:string)
  {
    var url=this.definition.data_url;
    var params=JSON.parse(this.definition.data_url_param);
    for(var item of params)
    {
      if (item=="search"){
        url=url.replace("{search}",query);
      }else
      {
        url=url.replace("{"+item+"}",this.data[item]);
      }
    }
    this.dataService.get(url).subscribe({next:(result:any)=>{
      this.search_results=result;
    }})
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['definition'])
    {
      if (this.definition.aut_config)
      {
        this.configs=JSON.parse(this.definition.aut_config);
        console.log(this.configs);
      }
    }
  }

  remove(value:any)
  {
    this.updatesource();
  }

  contentChanged()
  {
    this.updatesource();
  }

  updatesource()
  {
  //  this.data[this.definition.fieldname]=this.working_list;
  //  console.log(this.data);
  }

}
