import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { PageService } from 'src/app/services/page.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit,OnDestroy {

  private route_subscription:any;
  private event_subscription:any;
  public record_id:number=0;
  public record_type:string="";
  public data:any;
  public unique_id:string=uuidv4();
  public cache_id:string=uuidv4();
  public page_definition:any;
  public source_type:string="";

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private location:Location, 
    private page:PageService,
    public dataService:DataService,
    private event:NgEventBus,
    private loader: NgxUiLoaderService,
    public responsive: ResponsiveService,
    private confirm: ConfirmationService,
    private tool: ToolService
  ) {

   }

   ngOnInit(): void {
    this.route_subscriber();
    this.event_subscriber();
  }

  ngOnDestroy(): void {
    if (this.route_subscription!=null){this.route_subscription.unsubscribe();}
    if (this.event_subscription!=null){this.event_subscription.unsubscribe();}
  }

  event_subscriber()
  {
    this.event_subscription=this.event.on(this.unique_id).subscribe(result=>{
        this.doAction(result.data.key);
    })
  }

  route_subscriber()
  {
    this.route_subscription=this.route.paramMap.subscribe(result=>{
      const _module=result.get("module")??"";
      let _area=result.get("area")??"";
      const _section=result.get("section")??"";
      this.record_id=parseInt(result.get("id")??"");
      this.source_type=_section;
      if (_area==""){_area="records";}
      this.get_page(_module,_area,_section);
    })
  }

  get_page(module:string,area:string,section:string)
  {

  }

  get_specific_page(id:number)
  {
    this.page.get(this.source_type,id.toString()).subscribe({next:(result)=>{
      this.page_definition=result;
      if (this.page_definition.data_url!=null)
      {
        var url=this.page_definition.data_url.replace('{id}',this.record_id);
        url=url.replace('{source_type}',this.source_type);
        url=url.replace('{cacheid}',this.cache_id);
        this.dataService.get(url).subscribe({
          next:(data_result)=>{
            this.data=data_result;
            this.loader.stopLoader("page");
            this.tool.resolveMetaData(this.data,this.page_definition);
          },
          error:(error)=>{
            this.router.navigate(['error',404,'page']);
          }
        })
      }else
      {
        this.loader.stopLoader("page");
      }
    }})
  }

  get_page_check(_module:string,_area:string,_section:string,_original:any=null)
  {
    var key=_module+"_"+_area+"_"+_section;
    this.loader.startLoader("page");
    this.page.getbykey(key).subscribe({
      next:(result)=>{
          this.page_definition=result;
          if (this.page_definition.data_url!=null)
          {
            var url=this.page_definition.data_url.replace('{id}',this.record_id);
            url=url.replace('{source_type}',_original);
            url=url.replace('{cacheid}',this.cache_id);
            this.dataService.get(url).subscribe({
              next:(data_result)=>{
                this.data=data_result;
                this.tool.resolveMetaData(this.data,this.page_definition);
                this.loader.stopLoader("page");
              },
              error:(error)=>{
                this.router.navigate(['error',404,'page']);
              }
            })
          }else
          {
            this.loader.stopLoader("page");
          }

      },
      error:(error)=>{
        this.router.navigate(['error',404,'page']);
      }
    });
  }

  buttonpressed(event:any)
  {
      var action=event.button.action_key;
      this.doAction(action);

  }


  doAction(key:string)
  {
    var action=this.tool.resolveAction(key,this.page_definition);
    if (action!=null)
    {
      switch(action.type)
      {
        case 'save':
          if (action.confirm_message)
          {
            this.confirm.confirm({message:action.confirm_message,accept:()=>{
              this.tool.saveRecord(action,this.data,"page",this.unique_id);
            }})
          }else
          {
            this.tool.saveRecord(action,this.data,"page",this.unique_id);
          }
          break;
        case 'cancel_page':
          if (action.confirm_message)
          {
            this.confirm.confirm({message:action.confirm_message,accept:()=>{
              var url=action.url;
              url=url.replace("{source_type}",this.record_type);
              this.event.cast('top',{action:'goto',key:url});
            }})
          }else
          {
            this.event.cast('top',{action:'goto',key:action.url});
          }
          break;
        case 'goto':
          var url=action.url;
          url=url.replace("{source_type}",this.record_type);
          this.event.cast('top',{action:'goto',key:url});
      }
    }
  }

}
