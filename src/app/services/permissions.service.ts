import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private permissions:any={};

  constructor(private http:HttpClient) {
    this.reset();
   }

  reset(){
    this.permissions=null;
  }

  setMenu(items:MenuItem[])
  {
    return this.getPermissions().pipe(map((result)=>{
      var menus=result.filter((p: { type: string; })=>p.type=='menu');
        return this.setMenuItems(items,menus);
    }));
  }

  setMenuItems(items:MenuItem[],permissions:any[])
  {
    for(var item of items)
    {
        var check=permissions.filter(p=>p.id==item.id)[0];
        if (check!=null)
        {
          if (check.state==0){item.disabled=true;item.visible=true;}
          else if(check.state==1){item.disabled==false;item.visible=true;}
          else if(check.state==2){item.visible==false;}
        }
        if (item.items!=undefined&&item.items!=null)
        {
          item.items=this.setMenuItems(item.items,permissions);
        }
    }
    return items;
  }

  setFavourites(items:MenuItem[],favourites:any[])
  {
      var check=items.filter(p=>p.label=="Favourites")[0];
      if (favourites?.length==0 && check!=null)
      {
        var idx=items.indexOf(check);
        items.splice(idx,1);
        return items;
      }
      return items;
  }

  getPermissions()
  {
    if (this.permissions!=null) {
      return of(this.permissions);
    }   
    return this.http.get(environment.data_api+"users/mypermissions").pipe(
      take(1),
      map((data) => {
        this.permissions=data;
        return data;
      }
      )
      );
  }
}
