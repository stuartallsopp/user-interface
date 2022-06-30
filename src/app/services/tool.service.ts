import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { threadId } from 'worker_threads';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(
    private event:NgEventBus,
    private loader:NgxUiLoaderService,
    private message: MessageService,
    private dataService: DataService
  ) { }



  resolveAction(key:string,definition:any):any
  {
    return definition.actions.filter((p: { key: string; })=>p.key==key)[0];
  }

  sendEvent(action:any,valid:boolean,unique_id:string,data:any=null)
  {
    if (valid==true)
    {
      if (action.valid_key)
      {
        this.event.cast(unique_id,{type:'event',key:action.valid_key,data:data});
      }
    }
    if (valid==false)
    {
      if (action.invalid_key)
      {
        this.event.cast(unique_id,{type:'event',key:action.invalid_key,data:data});
      }
    }
  }

  updateList(action:any,data:any,propertybag:any,unique_id:string)
  {
    this.event.cast(propertybag.from,{type:'update_list',row:propertybag.row,data:data});
    if (action.valid_key)
    {
      this.event.cast(unique_id,{type:'event',key:action.valid_key});
    }
  }


  saveRecord(action:any,data:any,loader_key:string,unique_id:string)
  {
    var url="";
    var method="";
    if (data.id==0)
    {
       method="post";
    }else
    {
      method="put";
    }
    url=data.action_uri?data.action_uri[method]:"";
    if (method==""||url==""){
      this.message.add({severity:"error",detail:"Could not resolve the Url"});
      return;
    }
    this.loader.startLoader(loader_key);
    this.dataService.persist(method,url,data).subscribe({
      next:(result)=>{
        this.sendEvent(action,true,unique_id,result);
      },
      error:(error)=>{
        this.message.add({severity:"error",detail:error.error});
        this.loader.stopLoader(loader_key);
        this.sendEvent(action,false,unique_id);
      },
      complete:()=>{
        this.loader.stopLoader(loader_key);
      }
    })
  }
}
