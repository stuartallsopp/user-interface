import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { MenuItem } from 'primeng/api';
import { Inplace } from 'primeng/inplace';
import { MenuService } from 'src/app/services/menu.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit,OnDestroy {

 public items:any[]=[];
 private event_listener:any=null;
 private menu_listener:any=null;

 public favourite_customise_display:boolean=false;
 public favourite_list:any[]=[];
 public favourites_posting:boolean=false;
 public edit_position:any;

 
  constructor(
    private menu:MenuService,
    private event:NgEventBus,
    private permission:PermissionsService
  ) { }

  ngOnInit(): void {
    this.event_subscription();
    this.redraw();
  }

  ngOnDestroy(): void {
    if (this.event_listener!=null){this.event_listener.unsubscribe();}
    if (this.menu_listener!=null){this.menu_listener.unsubscribe();}
    this.event_listener=null;
    this.menu_listener=null;
}

refreshPermissions()
{
  this.permission.setMenu(this.items).subscribe(result=>{

  })
}


saveSettings()
{
  this.postfavchanges();
  this.favourite_customise_display=false;
}

redraw(force:boolean=false)
{
  this.menu.get("user",force).subscribe((result: any[])=>{
    this.items=[{label:"Home",routerLink:"home",icon:"fa-solid fa-house"}];
    this.items=[...this.items,...result];
    this.checkForFavourites();
    this.refreshPermissions();
  },(err: any)=>{
   // window.location.reload();
  }); 
}

checkForFavourites()
{
  var hasfav=this.getFavourites();
  if (hasfav!=null)
  {
    hasfav.items?.push({separator:true});
    hasfav.items?.push({label:"Customise...",command:()=>{
      this.customiseFavourites();
    }})
  }
}

postfavchanges()
{
  this.favourites_posting=true;
  this.menu.redefineFavourite(this.favourite_list).subscribe({
    next:(result)=>{
      this.redraw(true);
      this.favourites_posting=false;
    }
  })
}

reorderedlist()
{

}
getFavourites()
{
    return this.items.filter(p=>p.label=="Favourites")[0];
}

currentitemactivated()
{
  setTimeout(() => {
    var ele=document.getElementById(this.edit_position);
    ele?.focus();   
  }, 100);
}

deleteitem(fav:any){
  var idx=this.favourite_list.indexOf(fav);
  this.favourite_list.splice(idx,1);

}

setcurrentitem(source:Inplace,event:any,fav:any)
{
  this.edit_position="fav_"+fav.id;

  source.activate();

}

unsetcurrentitem(source:Inplace)
{
  source.deactivate();
  this.edit_position=null;
}

customiseFavourites()
{
  console.log(this.items);
  this.edit_position=null;
  this.favourite_customise_display=true;
  this.favourite_list=this.getFavourites().items.filter((p: { routerLink: string; })=>p.routerLink!=undefined);
  console.log(this.favourite_list);
}

  event_subscription()
  {
    this.event_listener=this.event.on("redraw").subscribe(result=>{
      if (result['data']!=null){
          if (result['data']['key']=="all"){
            this.redraw();
          }
      }
    })
    this.menu_listener=this.event.on("menu").subscribe(result=>{
            this.redraw(true);
    })
  }
}
