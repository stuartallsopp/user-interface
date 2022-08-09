import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MdlCommonService {

  private subscribers:any[]=[];
  constructor(private dataService:DataService,private event:NgEventBus) { }

  resolveDefinition(input:any)
  {
    var result:any={};
    result.label=input.title;
    result.fieldname='record';
    result.compulsory=input.compulsory;
    result.data_url=input.url;
    result.data_url_method='POST';
    result.data_url_param='{"search":"description","order":"code"}';
    result.aut_config='{"label":"pretty_description","id":"id"}';
    return result;
  }

  public setSubscribers(subscriptions:any[])
  {
    this.subscribers=subscriptions;
  }

  getFullRecord(item:any,local_data_source:any,options:any)
  {
    var record=item.record;
    var url=item.seek_url;
    var map_to=item.default_to;
      url=url.replace("{id}",record.id);
      this.dataService.get(url).subscribe({next:(result)=>{
        var check=local_data_source.lines.filter((p: { type: string; })=>p.type==map_to)[0];
        if (check!=null)
        {
          check.record=result[map_to];
          this.updateDisplayCode(local_data_source,options);
          if (this.subscribers.length>0&&item.publish!=undefined&&item.publish!=null)
          {
            this.publish(item.publish,result);
          }
        }
      }})
  }

  publish(publish_to:string,record:any)
  {
    var publish_list=publish_to.split(",");
    for(var publish_item of publish_list)
    {
      if (record[publish_item]!=undefined)
      {
        for(var subscriber of this.subscribers.filter(p=>p.reference==publish_item))
        {
          this.event.cast(subscriber.id,{action:'value_publish',data:record[publish_item]});
        }
      }
    }
  }

  updateDisplayCode(local_data_source:any,options)
  {
    var result='';
    for(var opt of options)
    {
      if (opt.record!=null)
      {
        result=result+opt.record.code + "-";
      }else{
        result=result+'????-';
      }
    }
    if (result.length>0)
    {
      result=result.substring(0,result.length-1);
    }
    local_data_source.display_code=result;
    return result;
  }

  item_selected(item:any,local_data_source:any,options:any)
  {
    if(item.record!=null)
    {
      if (item.default_to!=undefined&&item.default_to!=null)
      {
        this.getFullRecord(item,local_data_source,options)
      }else
      {
        this.updateDisplayCode(local_data_source,options);
      }
    }else
    {
      this.updateDisplayCode(local_data_source,options);
    }
    
  }
}
