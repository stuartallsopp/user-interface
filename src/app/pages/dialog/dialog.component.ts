import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/services/data.service';
import { DecorationService } from 'src/app/services/decoration.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ToolService } from 'src/app/services/tool.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit,AfterViewInit,OnDestroy {

  @HostBinding('tabindex') public tabindex = 0;
  
  private event_listener:any;
  public loader_key:string="";
  private propertybag:any=null;
  public unique_id:string=uuidv4();
  public definition:any;
  public data:any;
  public source_type:string="";
  private persist:boolean=true;


  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    public responsive: ResponsiveService,
    private loader: NgxUiLoaderService,
    private dataService: DataService,
    private message: MessageService,
    public element: ElementRef,
    private event: NgEventBus,
    private confirm : ConfirmationService,
    private tool: ToolService,
    public decor: DecorationService
    ) { }


  ngOnDestroy(): void {
    if (this.event_listener!=null)
    {
      this.event_listener.unsubscribe();
      this.event_listener=null;
    }
  }
  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }


  ngOnInit(): void {
    this.loader_key="dialog_"+this.unique_id;
    this.definition=this.config.data.definition;
    this.propertybag=this.config.data.propertybag;
    this.source_type=this.propertybag.source_type;
    this.initialise(this.propertybag);
    this.event_subscriber();
  }

  event_subscriber() {
    this.event_listener=this.event.on(this.unique_id).subscribe(result=>{
        this.doAction(result.data.key,result.data.data);
    })
  }

  initialise(property_bag:any)
  {
    if (this.definition.data_url==null||this.definition.data_url==undefined)
    {
      this.persist=false;
      this.initialiseFromRow(property_bag);
    }else
    {
      this.persist=true;
      this.initialiseData(property_bag);
    }
  }

  initialiseFromRow(property_bag:any)
  {

      this.data=this.tool.deepCopy(property_bag.content);
      if ((this.data?.id==undefined||this.data?.id==null)&&this.definition.initialise_url!=undefined&&this.definition.initialise_url!=null)
      {
        this.initialiseFromURL(property_bag);
      }
  }

  initialiseFromURL(property_bag:any)
  {
    var url=this.definition.initialise_url;
    url=url.replace('{source_type}',property_bag.source_type);
    url=url.replace('{parent}',property_bag.parent_id);
    this.loader.startLoader(this.loader_key);
    this.dataService.get(url).subscribe({next:(result)=>{
      this.data={...result};
      this.loader.stopLoader(this.loader_key);
      this.tool.resolveMetaData(this.data,this.definition,this.config);
    },
  error:(error)=>{
    this.message.add({severity:'error',detail:error.message});
    this.loader.stopLoader(this.loader_key);
  }})

  }



  initialiseData(property_bag:any)
  {
    var url="";
    if (property_bag.id==0&&this.definition.initialise_url!=null)
    {
      url=this.definition.initialise_url;
    }else if (property_bag.id!=0&&this.definition.data_url!=null)
    {
        url=this.definition.data_url.replace('{id}',property_bag.id);
    }
    url=url.replace("{source_type}",property_bag.source_type);
    if (property_bag.cache&&url!="")
    {
      url=url.replace("{cacheid}",property_bag.cache);
    }
    if (url!="")
    {
      this.getData(url);
    }
  }

  buttonpressed(event:any)
  {
      var action=event.button.action_key;
      this.doAction(action,null);
  }

  doAction(key:string,data:any)
  {
    var action=this.tool.resolveAction(key,this.definition);
    if (action!=null)
    {
      switch(action.type)
      {
        case 'save':
          if (action.confirm_message)
          {
            this.confirm.confirm({message:action.confirm_message,accept:()=>{
              if (this.persist==true)
              {
                this.tool.saveRecord(action,{...this.data},this.loader_key,this.unique_id);
              }else
              {
                this.tool.updateList(action,{...this.data},this.propertybag,this.unique_id);
              }   
            }})
          }else
          {
            if (this.persist==true)
            {
              this.tool.saveRecord(action,{...this.data},this.loader_key,this.unique_id);
            }else
            {
              this.tool.updateList(action,{...this.data},this.propertybag,this.unique_id);
            } 
          }
          break;
        case 'cancel_dialog':
          this.ref.close();
          break;
        case 'close_dialog':
          this.tool.sendEvent(action,true,this.unique_id,data);
          this.ref.close();
          break;
        case 'redraw_parent':
          this.event.cast(this.propertybag.from,{type:'redraw',data:data});
          this.tool.sendEvent(action,true,this.unique_id,data);
          break;
        case 'goto':
          this.event.cast('top',{action:'goto',url:action.url});
          break;
        case 'move':
          var url=action.url;
          url=url.replace("{source_type}",this.propertybag.source_type);
          url=url.replace("{id}",data.id);
          this.event.cast('top',{action:'goto',key:url,data:data});
          break;
      }
    }
  }

  getData(url:string)
  {
      this.loader.startLoader(this.loader_key);
      this.dataService.get(url).subscribe({
      next:(result)=>{
          this.data=result;
          this.tool.resolveMetaData(this.data,this.definition,this.config);
      },
      error:(error)=>{
          this.message.add({key:"standard",severity:'error',detail:error.message});
          this.loader.stopLoader(this.loader_key);
      },
      complete:()=>{
        this.loader.stopLoader(this.loader_key);
      }
    })
  }

}

