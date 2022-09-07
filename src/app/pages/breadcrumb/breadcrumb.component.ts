import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { MenuItem, MessageService,Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit,OnChanges,OnDestroy {

  @Input() crumbs:string="";
  @Input() crumbspath:string="";
  @Input() definition:any;
  @Input() hasfavourite:boolean=false;
  @Input() current_route:string="";
  @Input() data:any;
  @Input() source_type:string="";
  @Input() period_selector:boolean=false;

  public period_options:any[]=[];
  private period_subscription:any;
  private period_subscriber_list:any[]=[];
  public selected_period:any;
  public home:any;
  public items:MenuItem[]=[];
  public isFavourite:boolean=false;
  public favupdate:any={url:null,name:null};
  constructor(private mess:MessageService,private menu:MenuService,private event:NgEventBus,private auth:AuthService,private dataService:DataService) { }
  ngOnDestroy(): void {
    if (this.period_subscription!=null)
    {
      this.period_subscription.unsubscribe();
      this.period_subscription=null;
    }
  }

  ngOnInit(): void {
    this.home={label:' '+this.auth.getOrganisationName(),routerLink:"/home",icon:"fa-regular fa-house"};
    this.period_subscriber();
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
    if (changes['crumbs']!=null||changes['data']!=null||changes['source_type']!=null)
    {
        this.resolveBreadcrumb();
        if (this.period_selector==true)
        {
          this.resolvePeriods();
        }
    }
    if (changes['current_route']||changes['definition'])
    {
      this.isFavourite=this.menu.checkFavourite(this.current_route);
      this.favupdate.url=this.current_route;
      this.favupdate.name=this.definition.description;
    }
  }

  period_subscriber()
  {
    this.period_subscriber_list=[];
    this.period_subscription=this.event.on('list_interchange').subscribe(result=>{
        this.period_subscriber_list.push({id:result.data.key,property:result.data.property});
    });
  }

  period_changed()
  {
    this.transmit_period_change('global_period_changed');
  }

  transmit_period_change(type:string)
  {
    for(var sub of this.period_subscriber_list)
    {
        this.event.cast(sub.id,{type:type,period:this.selected_period});
    }
  }

  resolvePeriods()
  {
    this.dataService.get('list/system/moduleperiods/'+this.source_type).subscribe({next:(result)=>{
        this.period_options=result['periods'];
        this.selected_period=result['current_period'];
        this.transmit_period_change('global_period_initialise');
    }})
  }

  resolveBreadcrumb()
  {
    this.items=[];
    var resolves:string[]=[];
    if (this.crumbspath!=null)
    {
      var resolves=this.crumbspath.split(",");
    }
    if (this.crumbs==null){return;}
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
      }else if (item.indexOf("[")>-1&&this.data!=null)
      {
        this.items.push({label:this.data.meta_data[item.replace("[","").replace("]","")]});
      }
      else
      {
        this.items.push({label:item});
      }
      idx++;
    }
    idx=0;
    for(var res of resolves)
    {
      res=res.replace("{source_type}",this.source_type);
      this.items[idx].routerLink=res;
      idx++;
    }
  }

}
