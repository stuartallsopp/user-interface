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
      begins:null
    }
    if (search!=null)
    {
      var begins=search.filter((p: { type: string; })=>p.type=="begins");
      if (begins!=null)
      {
        payload.begins=begins;
      }
    }

    return this.http.post(environment.data_api+url,payload);
  }

  get(url:string)
  {
    return this.http.get(environment.data_api+url);
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
