import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { MenuItem } from 'primeng/api';
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

getFavourites()
{
    return this.items.filter(p=>p.label=="Favourites")[0];
}

customiseFavourites()
{
  console.log(this.items);
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
