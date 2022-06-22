import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

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

  getdialog(id:number)
  {
    return this.http.get<any[]>(environment.forms_api+"page/dialog/"+id.toString()).pipe(
      take(1),
      map((data) => {
          return data;
      }
      )
    );
  }

  get(unique_key:string):Observable<any>
  {
    return this.http.get<any[]>(environment.forms_api+"page/"+unique_key).pipe(
      take(1),
      map((data) => {
          return data;
      }
      )
    );
  }

  getbykey(unique_key:string):Observable<any>
  {
    return this.http.get<any[]>(environment.forms_api+"page/key/"+unique_key).pipe(
      take(1),
      map((data) => {
          return data;
      }
      )
    );
  }
}
