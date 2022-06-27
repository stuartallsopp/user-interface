import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private initialised:boolean=false;

  constructor(private http: HttpClient) { 
    
  }

  get(user:string,force:boolean=false):Observable<any>
  {
    if (force==false)
    {
      var check=localStorage.getItem("menu");
      if (check) {
        return of(JSON.parse(check));
      }  
    }
    return this.http.get<any[]>(environment.forms_api+"menu").pipe(
      take(1),
      map((data) => {
        var directory:any[]=[];
        var result:MenuItem[]=[];
        for(var d of data)
        {
           result.push(this.resolveMenuItem(d,directory))
        }
        localStorage.setItem("menu", JSON.stringify(result));
        localStorage.setItem("page_directory",JSON.stringify(directory));
        return result;
      }
      )
    );
  }

  setFavourite(link:string,directory:any[]):any[]
  {
      var pathkey=link.replace("/pages/","");
      var split=pathkey.split("/");


      return directory;
  }

  checkFavourite(path:string):boolean
  {
    var menutext=localStorage.getItem("menu");
    if (menutext!=null)
    {
      var menus=JSON.parse(menutext);
      var check=menus.filter((p: { label: string; })=>p.label=="Favourites")[0];
      if (check!=null)
      {
        return check.items.filter((p: { routerLink: string; })=>p.routerLink==path)[0]!=null
      }
    }
    return false;
  }

  deleteFavourite(fav:any)
  {
    return this.http.post(environment.forms_api+'menu/favourite/delete',fav);
  }

  updateFavourite(fav:any)
  {
    return this.http.post(environment.forms_api+'menu/favourite/update',fav);
  }

  resolveMenuItem(source:any,directory:any[]):MenuItem
  {
    var result:MenuItem={
      label:source.label,icon:source.icon
    };
    if (source.routerLink!=null)
    {
      result.routerLink=source.routerLink;
      directory=this.setFavourite(result.routerLink,directory);
    }
    if (source.path_key!=null)
    {
      result.routerLink="pages/"+source.path_key;
      directory=this.addToDirectory(source.path_key,directory,source.id);
    }
    if (source.children.length>0)
    {
      var list:MenuItem[]=[];

      for(var child of source.children)
      {
        list.push(this.resolveMenuItem(child,directory))
      }
      result.items=list;
    }
    return result;
  }

  addToDirectory(keys:string,directory:any[],id:string):any[]
  {
    var spl:string[]=keys.split('/');
    if (spl.length>=1)
    {
      var module:string=spl[0];
      var search=directory.filter(p=>p.key==module)[0];
      if (search==null)
      {
        search={key:module,pages:[]};
        directory.push(search);
      }
      if (spl.length>=2)
      {
        var type_i:string=spl[1];
        var page:string=spl[2];
        var psearch=search.pages.filter((p: { key: string; type: string; })=>p.key==type_i&&p.type==page)[0];
        if (psearch==null)
        {
          psearch={key:type_i,type:page,id:id,favourite:false};
          search.pages.push(psearch);
        }
      }
    }
    return directory;
  }
}
