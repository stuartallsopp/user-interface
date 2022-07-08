import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  list(url:string,page_size:number,page:number,order_by:string,dir:string,search:any=null)
  {
    var payload={
      page:page,
      page_size:page_size,
      order_by:order_by,
      direction: dir,
      begins:null,
      contains:null,
      equals:null,
      isin:null
    }
    if (search!=null)
    {
      var begins=search.filter((p: { type: string; })=>p.type=="begins");
      if (begins.length>0)
      {
        payload.begins=begins;
      }
      var equals=search.filter((p: { type: string; })=>p.type=="equals");
      if (equals.length>0)
      {
        console.log('got equals');
        payload.equals=equals;
      }
      var contains=search.filter((p: { type: string; })=>p.type=="contains");
      if (contains.length>0)
      {
        payload.contains=contains;
      }
      var isin=search.filter((p: { type: string; })=>p.type=="isin");
      if (isin.length>0&&isin[0].value!=null)
      {
        payload.isin=isin;
      }
    }
    return this.http.post(environment.data_api+url,payload);
  }

  checkNoteType(type:string)
  {
    return this.http.get(environment.data_api+"note/checktype/"+type);
  }

  getNotes(type:string,id:number)
  {
    return this.http.get(environment.data_api+"note/"+type+"/"+id.toString());
  }

  postNote(payload:any)
  {
    return this.http.post(environment.data_api+"note",payload);
  }

  get(url:string)
  {
    return this.http.get(environment.data_api+url);
  }

  post(url:string,payload:any)
  {
    return this.http.post(environment.data_api+url,payload);
  }

  persist(method:string,url:string,data:any)
  {
      if (method=='post')
      {
        return this.http.post(environment.data_api+url,data);
      }else
      {
        return this.http.put(environment.data_api+url,data);
      }
  }
}
