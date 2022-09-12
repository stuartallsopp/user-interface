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

  getFullRecord(master:string,item:any,local_data_source:any,options:any)
  {
    console.log(item);
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
          this.check_other_settings(master,result,options,local_data_source);
        }
      }})
  }

  check_other_settings(master:string,record:any,options:any,local_data_source:any)
  {
      var working_list=record.defaults_settings.filter(p=>p.type==master);
      for(var check_item of working_list)
      {
          var check_option=options.filter(p=>p.type==check_item.record_type)[0];
          if (check_option!=null&&check_option.record==null)
          {
            check_option.record=check_item.record_type=='nominal'?check_item.gen_record:check_item.dat_record;
            this.updateDisplayCode(local_data_source,options);
            this.getFullRecord(master,check_option,local_data_source,options);
          }
      }
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
        this.getFullRecord(local_data_source.type,item,local_data_source,options)
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
