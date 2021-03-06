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

  deepCopy(obj:any) {
    var copy:any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
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
      this.message.add({key:"standard",severity:"error",detail:"Could not resolve the Url"});
      return;
    }
    this.loader.startLoader(loader_key);
    this.dataService.persist(method,url,data).subscribe({
      next:(result)=>{
        this.sendEvent(action,true,unique_id,result);
      },
      error:(error)=>{
        this.message.add({key:"standard",severity:"error",detail:error.error});
        this.loader.stopLoader(loader_key);
        this.sendEvent(action,false,unique_id);
      },
      complete:()=>{
        this.loader.stopLoader(loader_key);
      }
    })
  }
}
