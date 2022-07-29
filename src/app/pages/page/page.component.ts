import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgEventBus } from 'ng-event-bus';
import { PageService } from 'src/app/services/page.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit,OnDestroy {

  private route_subscription:any;
  private currentpage:any;
  private event_listener:any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private location:Location, 
    private page:PageService,
    private event:NgEventBus,
    private loader: NgxUiLoaderService,
    public responsive: ResponsiveService
  ) { }

  public page_definition:any;

  public data:any=null;
  public cache_id:string="";
  public section:string="";
  public current_route:string="";


  ngOnInit(): void {
    this.route_subscriber();
  }

  ngOnDestroy(): void {
    if (this.route_subscription!=null){this.route_subscription.unsubscribe();}
  }

  get_page(source_type:string,key:string)
  {
    this.loader.startBackgroundLoader("page");
    this.page.get(source_type,key).subscribe({
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
      const _area=result.get("area")??"";
      const _section=result.get("section")??"";
      this.current_route=this.router.url;
      const _validate=this.page.checkKey(_module,_area,_section);
      const _source_type=this.page.checkType(_module,_area,_section);
      this.section=_section;
      this.get_page(_source_type,_validate);
    })
  }
}
