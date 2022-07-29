import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-listi',
  templateUrl: './listi.component.html',
  styleUrls: ['./listi.component.scss']
})
export class ListiComponent implements OnInit,OnChanges {

  @Input() definition:any;
  @Input() data:any;
  @Input() cacheid:string="";
  @Input() source_type:string="";

  public loader_key:string="";

  public unique_id:string=uuidv4();
  public list_content:any[]=[];
  private list_source_type:string="";
  public fetching:boolean=false;
  public record_count:number=0;
  public current_page:number=1;


  private event_subscriber:any;

  constructor(
    private dataService:DataService,
    private loader:NgxUiLoaderService,
    private event:NgEventBus,
    private mess:MessageService
    ) {

   }
  ngOnDestroy(): void {
     if(this.event_subscriber!=null)
     {
      this.event_subscriber.unsubscribe();
      this.event_subscriber=null;
     }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.loader_key="list_"+this.definition.id;
    }
    if (changes['definition']||changes['data'])
    {
      this.refresh(this.current_page);
    }
  }


  loadMore()
  {
    this.current_page++;
    this.refreshFromUrl(this.current_page);
  }

  event_subscription()
  {
    this.event_subscriber=this.event.on(this.unique_id).subscribe(result=>{
      if (result.data.type=='redraw')
      {
        this.refresh(this.current_page);
      }
    })
  }

  ngOnInit(): void {
    this.event_subscription();
    this.list_content=[];
    this.record_count=0;
  }


  sendEvent(rowIndex:number,action:string)
  {
    var id:number=0;
    if (rowIndex>=0)
    {
      id=this.list_content[rowIndex].id;
    }
    var action_item=this.definition.actions.filter((p: { key: string; })=>p.key==action)[0];
    if (action_item==null)
    {
        this.mess.add({severity:"error",detail:"The method for the " +action+" event can not be found."});
        return;
    }
    this.processEvent(id,action_item,rowIndex,this.list_content[rowIndex]);
  }

  processEvent(id:number,action:any,rowIndex:number,data:any)
  {
    switch (action.type)
    {
      case 'dialog':
        this.event.cast('top',{from:this.unique_id,action:'dialog',key:action.dialog_key,id:id,cache:this.cacheid,row:rowIndex,content:data,source_type:this.source_type,parent_id:this.data?.id});
        break;
      case 'goto':
        this.event.cast('top',{from:this.unique_id,action:'goto',key:action.url,id:id,source_type:this.source_type});
        break;
      case 'note':
        this.event.cast('top',{from:this.unique_id,action:'note',id:id,source_type:data.action_uri.type,data:data});
        break;
      case 'import':
        this.event.cast('top',{from:this.unique_id,action:'import',source_type:this.list_source_type+(this.source_type.length==0?"":"."+this.source_type)});
        break;
    }
  }

  alignment(align:string)
  {
    switch(align)
    {
      case 'L':
        return 'text-left';
        case 'R':
          return 'text-right';
        case 'C':
          return 'text-center';
        default:
          return 'text-left';
    }
  }

  refresh(pageno:number=1,filters:any=null)
  {
    if (this.definition.data_field?.length>0 && this.data!=null&&this.data!=undefined)
    {
      this.list_content=this.data[this.definition.data_field];
      this.record_count=this.list_content.length;
    }
    if (this.definition.data_url!=undefined&&this.definition.data_url!=null)
    {
      this.refreshFromUrl(pageno);
    }
  }




  refreshFromUrl(pageno:number=1,filters:any=null)
  {
    this.fetching=true;
    if (this.definition.data_url?.length>0)
    {
      var url=this.definition.data_url;
      if (url.indexOf('{source_type}')>=0)
      {
        url=url.replace('{source_type}',this.source_type);
      }
      this.loader.startLoader(this.loader_key);
      const local=this;
      const dir:string=this.definition.direction==undefined||this.definition.direction==1?"asc":"desc";
      this.dataService.list(url,this.definition.page_size,pageno,this.definition.sort_key,dir,null)
      .subscribe(
        {
          next:(result:any)=>{
              this.list_content.push(...result.records);
              this.list_content=[...this.list_content];
              this.record_count=result.totalrecords;
              this.current_page=result.page;
          },
          error:(error)=>{
            local.loader.stopLoader(local.loader_key);
            local.fetching=false;
          },
          complete() {
            local.loader.stopLoader(local.loader_key);
            local.fetching=false;
          },
        }
      )
    }
  }

}
