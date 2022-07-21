import { HttpClient } from '@angular/common/http';
import { ForwardRefHandling } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) {
    var recent=localStorage.getItem("recent_pages");
    if (recent!=null)
    {
      this.recent_pages=JSON.parse(recent);
    }
   }


   private use_local_cache:boolean=false;
  private recent_pages:any[]=[];

  checkKey(key1:string,key2:string,key3:string):any
  {
    const dir_data:string=localStorage.getItem("page_directory")??"";
    const directory=JSON.parse(dir_data);
    const area:any=directory.filter((p: { key: string; })=>p.key==key1)[0];
    if (area==null){return null;}
    var check2:any;
    if (key3=="")
    {
        check2=area.pages.filter((p: { key: string; })=>p.key==key2)[0];
    }else
    {
      check2=area.pages.filter((p: { key: string; type: string; })=>p.key==key2&&p.type==key3)[0];

    }
    if (check2==null){return null}else{return check2.id;}
  }

  checkType(key1:string,key2:string,key3:string):any
  {
    const dir_data:string=localStorage.getItem("page_directory")??"";
    const directory=JSON.parse(dir_data);
    const area:any=directory.filter((p: { key: string; })=>p.key==key1)[0];
    if (area==null){return null;}
    var check2:any;
    if (key3=="")
    {
        check2=area.pages.filter((p: { key: string; })=>p.key==key2)[0];
    }else
    {
      check2=area.pages.filter((p: { key: string; type: string; })=>p.key==key2&&p.type==key3)[0];

    }
    if (check2==null){return null}else{return check2.type;}
  }

  getdialog(id:number,source_type:string)
  {
    if (this.use_local_cache==true)
    {
      if (this.recent_pages.filter(p=>p.key==id.toString()+"_"+source_type)[0]!=null)
      {
        return of(this.recent_pages.filter(p=>p.key==id.toString()+"_"+source_type)[0].form);
      }
    }
    return this.http.get<any[]>(environment.forms_api+"page/dialog/"+source_type+"/"+id.toString()).pipe(
      take(1),
      map((data) => {
        if (this.use_local_cache==true)
        {
          this.appendToCatalog(data,id.toString()+"_"+source_type);
        }
          return data;
      }
      )
    );
  }

  appendToCatalog(data:any,key:string)
  {
    this.recent_pages.push({key:key,form:data});
    if (this.recent_pages.length>10)
    {
      this.recent_pages.splice(0,1);
    }
    localStorage.setItem("recent_pages",JSON.stringify(this.recent_pages));
  }

  get(source_type:string,unique_key:string):Observable<any>
  {
    console.log(source_type);
    if (this.use_local_cache==true)
    {
      if (this.recent_pages.filter(p=>p.key==unique_key)[0]!=null)
      {
        return of(this.recent_pages.filter(p=>p.key==unique_key)[0].form);
      }
    }
    return this.http.get<any[]>(environment.forms_api+"page/"+source_type+"/"+unique_key).pipe(
      take(1),
      map((data) => {
        if (this.use_local_cache==true)
        {
          this.appendToCatalog(data,unique_key);
        }
          return data;
      }
      )
    );
  }

  getbykey(unique_key:string):Observable<any>
  {
    console.log(unique_key);
    if (this.use_local_cache==true)
    {
      if (this.recent_pages.filter(p=>p.key==unique_key)[0]!=null)
      {
        return of(this.recent_pages.filter(p=>p.key==unique_key)[0].form);
      }
    }

    return this.http.get<any[]>(environment.forms_api+"page/key/"+unique_key).pipe(
      take(1),
      map((data) => {
        if (this.use_local_cache==true)
        {
          this.appendToCatalog(data,unique_key);
        }
          return data;
      }
      )
    );
  }
}
