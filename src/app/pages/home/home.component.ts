import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgEventBus } from 'ng-event-bus';
import { PageService } from 'src/app/services/page.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {


  private route_subscription:any;
  public page_definition:any=null;
  public current_route:string="";
  private currentpage:any;
  public module:string;
  private event_listener:any;
  public cache_id:string="";
  public data:any={};
  public section:string="";

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private location:Location, 
    private page:PageService,
    private event:NgEventBus,
    private loader: NgxUiLoaderService,
    public responsive: ResponsiveService
  ) { }
  ngOnDestroy(): void {
    if (this.route_subscription!=null){this.route_subscription.unsubscribe();}
  }

  ngOnInit(): void {
    this.route_subscriber();
  }

  get_page(key:string)
  {
    this.loader.startBackgroundLoader("page");
    this.page.get("home",key).subscribe({
      next:(result)=>{
          this.page_definition=result;
          this.loader.stopBackgroundLoader("page");
      },
      error:(error)=>{
        this.router.navigate(['error',404,'page']);
      }
    });
  }

  route_subscriber()
  {
    this.route_subscription=this.route.paramMap.subscribe(result=>{
      const _module=result.get("module")??"";
      this.module=_module;
      this.current_route=this.router.url;
      var _validate=this.page.checkKey(_module,"home","");
      if (_validate==null&&_module=="")
      {
        _validate="HOME";
      }
      this.get_page(_validate);
    })
  }
}
