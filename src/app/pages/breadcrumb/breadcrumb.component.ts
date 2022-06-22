import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { MenuItem, MessageService,Message } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit,OnChanges {

  @Input() crumbs:string="";
  @Input() crumbspath:string="";
  @Input() definition:any;
  @Input() hasfavourite:boolean=false;
  @Input() current_route:string="";
  @Input() data:any;

  public home:MenuItem={label:' Home',routerLink:"/home",icon:"fa-solid fa-house"}
  public items:MenuItem[]=[];
  public isFavourite:boolean=false;
  public favupdate:any={url:null,name:null};
  constructor(private mess:MessageService,private menu:MenuService,private event:NgEventBus) { }

  ngOnInit(): void {
    
  }

  checkfavevent(op:any,event:any)
  {
    if (this.isFavourite==false)
    {
      op.toggle(event);
    }else
    {
        this.menu.deleteFavourite(this.favupdate).subscribe({next:(result)=>{
          this.mess.add({severity:"info",detail:this.favupdate.name,summary:"Favourite Removed"});
          this.event.cast("menu",{type:"redraw"});
          this.isFavourite=false;
        }})
    }

  }

  updateFavourite(op:any)
  {
    this.menu.updateFavourite(this.favupdate).subscribe(
      {next:()=>{
      this.mess.add({severity:"info",detail:this.favupdate.name,summary:"Favourite Added"});
      this.isFavourite=true;
      this.event.cast("menu",{type:"redraw"});
      op.hide();
    }})
  }

  toggleinfo()
  {
    this.mess.add({severity:'info', summary:this.definition.description, detail:this.definition.help_text});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['crumbs']!=null||changes['data']!=null)
    {
        this.resolveBreadcrumb();
    }
    if (changes['current_route']||changes['definition'])
    {
      this.isFavourite=this.menu.checkFavourite(this.current_route);
      this.favupdate.url=this.current_route;
      this.favupdate.name=this.definition.description;
    }
  }

  resolveBreadcrumb()
  {
    this.items=[];
    var resolves:string[]=[];
    if (this.crumbspath!=null)
    {
      var resolves=this.crumbspath.split(",");
    }
    const split=this.crumbs.split("/");
    var idx=0;
    for(var item of split)
    {
      if (item.toLowerCase()=="home")
      {
        this.items.push({label:item,routerLink:"/home"})
      }
      else if (item.indexOf("{")>-1&&this.data!=null)
      {
        this.items.push({label:this.data[item.replace("{","").replace("}","")]})
      }
      else
      {
        var resolve="";
        if (resolves&&resolves[idx])
        {
          resolve=resolves[idx];
        }
        if (resolve!=null&&resolve!="")
        {
          this.items.push({label:item,routerLink:resolve})
        }else
        {
          this.items.push({label:item});
        }

      }
      idx++;
    }
  }

}
