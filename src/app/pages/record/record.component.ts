import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PageService } from 'src/app/services/page.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmationService } from 'primeng/api';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit,OnDestroy {

  private route_subscription:any;
  private event_subscription:any;
  private record_id:number=0;
  public data:any={};

  public unique_id:string=uuidv4();
  public cache_id:string=uuidv4();

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private location:Location, 
    private page:PageService,
    private dataService:DataService,
    private event:NgEventBus,
    private loader: NgxUiLoaderService,
    public responsive: ResponsiveService,
    private confirm: ConfirmationService,
    private tool: ToolService
  ) { }

  public page_definition:any;

  ngOnInit(): void {
    this.route_subscriber();
    this.event_subscriber();
  }

  ngOnDestroy(): void {
    if (this.route_subscription!=null){this.route_subscription.unsubscribe();}
    if (this.event_subscription!=null){this.event_subscription.unsubscribe();}
  }


  buttonpressed(event:any)
  {
    console.log(event);
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
              this.event.cast('top',{action:'goto',key:action.url});
            }})
          }else
          {
            this.event.cast('top',{action:'goto',key:action.url});
          }
          break;
        case 'goto':
          this.event.cast('top',{action:'goto',key:action.url});
      }
    }
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
      const _area=result.get("area")??"";
      const _section=result.get("section")??"";
      this.record_id=parseInt(result.get("id")??"");
      this.get_page(_module,_area,_section);
    })
  }


  get_page(_module:string,_area:string,_section:string)
  {
    var key=_module+"_"+_area+"_"+_section;
    this.loader.startLoader("page");
    this.page.getbykey(key).subscribe({
      next:(result)=>{
          this.page_definition=result;
          var url=this.page_definition.data_url.replace('{id}',this.record_id);
          var url=url.replace('{cacheid}',this.cache_id);
          this.dataService.get(url).subscribe({
            next:(data_result)=>{
              this.data=data_result;
              this.loader.stopLoader("page");
            },
            error:(error)=>{
              this.router.navigate(['error',404,'page']);
            }
          })
      },
      error:(error)=>{
        this.router.navigate(['error',404,'page']);
      }
    });
  }

}
