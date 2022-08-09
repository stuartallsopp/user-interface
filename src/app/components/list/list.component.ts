import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { ToolService } from 'src/app/services/tool.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnChanges,OnDestroy {

  @Input() definition:any;
  @Input() data:any;
  @Input() cacheid:string="";
  @Input() source_type:string="";

  @Output() list_selection_changed:EventEmitter<any>=new EventEmitter<any>();
  public loader_key:string="";

  private buttons_published:boolean=false;
  private data_interchange_subscriber:any;
  public unique_id:string=uuidv4();
  public selectionmode:string="";
  public list_content:any[]=null;
  public list_selected:any[]=[];
  public footer_columns:any[]=[];
  public list_totals:any[]=[];
  private list_source_type:string="";
  public fetching:boolean=false;
  public record_count:number=0;
  public hasfilters:boolean=false;
  public hard_coded_filters:any[]=[];
  public filters:any[]=[];
  public current_page:number=1;
  private current_filters:any=null;
  public posting_list:any[]=[];
  public posting_active:boolean=false;
  public posting_action:any=null;
  private publish_to:any[]=[];
  public subscribe_from:any[]=[];
  private event_subscriber:any;

  constructor(
    private dataService:DataService,
    private loader:NgxUiLoaderService,
    private event:NgEventBus,
    private mess:MessageService,
    private comfirm:ConfirmationService,
    private tool:ToolService,
    private post:PostService
    ) {

   }
  ngOnDestroy(): void {
     if(this.event_subscriber!=null)
     {
      this.event_subscriber.unsubscribe();
      this.event_subscriber=null;
     }
     if (this.data_interchange_subscriber!=null)
     {
      this.data_interchange_subscriber.unsubscribe();
      this.data_interchange_subscriber=null;
     }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.loader_key="list_"+this.definition.id;
      this.resolveFooterColumns();
      this.resolveselectionMode();
      this.publishButtons();
      this.resolvepublication();
      this.event_subscription();
      this.publish_subscription();
    }
    if (changes['definition']||changes['data'])
    {
      this.checkFilters();
    }
  }

  filterChanged(filters:any)
  {
    this.current_filters=filters;
    this.refresh(1);
  }

  resolvepublication()
  {
    if (this.definition.publish!=undefined&&this.definition.publish!=null)
    {
      var targets=this.definition.publish.split(',');
      this.publish_to=[];
      for(var target of targets)
      {
          this.publish_to.push({'source':target,key:''});
      }
    }
  }

  checkFilters()
  {
    if (this.definition.filters.length==0){
      this.refresh();
    }
    else
    {
      var filter=this.definition.filters.filter((p: { type: string; })=>p.type=='url')[0];
      if (filter!=null)
      {
        this.dataService.post(filter.definition_url,{items:filter.items}).subscribe({
          next:(result:any)=>{
            this.hasfilters=true;
            this.harcoded_filters();
            this.filters=result.items;
          },
          error:(error)=>{
    
          }
        })
      }else
      {
        this.harcoded_filters();
        this.refresh();
      }
    }
    
  }

  harcoded_filters()
  {
    var hc=this.definition.filters.filter((p: { type: string; })=>p.type=='hard')[0];
    if (hc!=null)
    {
      this.hard_coded_filters=JSON.parse(hc.hard_coded);
    }
  }

  publishButtons()
  {
    if (this.buttons_published==false&&(this.definition.subscribe==undefined||this.definition.subscribe==null))
    {
      this.event.cast('actionpanel',{from:this.unique_id,buttonset:this.definition.buttonset});
    }
    
  }

  calculateTotals()
  {
    var columns=this.definition.columnset?.list_columns;
    if (columns)
    {
      this.list_totals=[];
      for(var col of columns.filter((p: { total: boolean; })=>p.total==true))
      {
        var sum=this.list_content.reduce((sum,current:any)=>sum+current[col.field],0);
        var item={key:col.field,value:sum};
        this.list_totals.push(item);
      }
    }
  }


  resolveFooterColumns()
  {
    if (!this.definition){return;}
    this.footer_columns=[];
    var columns=this.definition.columnset?.list_columns.filter((p: { visible: boolean; })=>p.visible==true);
    if (columns)
    {
      if (columns.filter((p: { total: boolean; })=>p.total==true).length==0)
      {
        this.footer_columns.push({type:'totalrecords',key:null,colspan:columns.length,visible:true});
      }else
      {
        var first=columns.filter((p: {total: boolean; })=>p.total==true)[0];
        var indxof=columns.indexOf(first);
        this.footer_columns.push({type:'totalrecords',key:null,colspan:indxof,visible:true});
        while(indxof<columns.length)
        {
          if (columns[indxof].total==true)
          {
            this.footer_columns.push({type:'total',key:columns[indxof].field,colspan:1,format:columns[indxof].format,visible:columns[indxof].visible,context_param:columns[indxof].context_param});
          }else
          {
            this.footer_columns.push({type:'empty',key:null,colspan:1,visible:columns[indxof].visible});
          }
          indxof++;
        }
      }
    }
  }

  validateSelection(from:string,event:any=null)
  {
    if (this.selectionmode=='multiple')
    {
      if (from=='rsel' && event?.data==null){
        return;
      }
      var local=this.list_selected.filter((element: any) => {
        return element !== null;
      });
      this.list_selected=[...local];
    }
    if (from=='run')
    {
      this.list_selection_changed.emit({type:this.source_type,subtype:this.list_source_type,value:null});
    }
    if (from=='rsel')
    {
      this.list_selection_changed.emit({type:this.source_type,subtype:this.list_source_type,value:event.data});
    }
    this.line_selected()
  }

  line_selected()
  {
    if (this.publish_to.length>0)
    {
      for(var item of this.publish_to)
      {
        if (item.key!='')
        {
            this.event.cast(item.key,{type:'publisher_data_changed',data:this.list_selected});
        }
      }
    }
  }

  resolveselectionMode()
  {
    var check=this.definition.buttonset?.buttons.filter((p: { multiple: boolean; })=>p.multiple==true);
    this.selectionmode=check?.length>0?"multiple":"single";
  }

  sortlist(event:any)
  {
    if (this.definition.sort_key!=event.field||this.definition.direction!=event.order)
    {
      this.definition.sort_key=event.field;
      this.definition.direction=event.order;
      this.refresh(0);
    }
  }

  update_subscriptions(source:any)
  {
    if (source.data==null)
    {
      this.list_content=null;
      this.record_count=0;
    }else
    {
      this.data={...source.data};
      this.list_content=source.data[this.definition.data_field];
      this.list_content=[...this.list_content];
      this.record_count=this.list_content.length;
    }

    this.calculateTotals();
  }

  update_publishers(source:any)
  {
    var check=this.subscribe_from.filter(p=>p.key==source.property)[0];
    if (check!=null)
    {
      check.target=source.key;
      check.description=source.description;
      this.data=null;
      this.list_content=null;
    }
  }

  check_publish_list(source:any)
  {
    var check=this.publish_to.filter(p=>p.source==source.property)[0];
    if (check!=null)
    {
      check.key=source.key;
      this.event.cast(check.key,{type:'subscriber_response',key:this.unique_id,property:check.source,description:this.definition.description});
    }
  }

  resolveSubcriptionName()
  {
    if (this.subscribe_from==undefined||this.subscribe_from==null||this.subscribe_from.length==0){return null;}
    return this.subscribe_from[0].description;
  }

  event_subscription()
  {
    this.data_interchange_subscriber=this.event.on('list_interchange').subscribe(result=>{
        if (this.publish_to.length>0)
        {
          this.check_publish_list(result.data);
        }
    })
    this.event_subscriber=this.event.on(this.unique_id).subscribe(result=>{
      if (result.data.type=='redraw')
      {
        this.refresh(this.current_page);
      }
      if (result.data.type=='listbuttonclick')
      {
        this.sendEvent(-1,result.data.button.action_key);
      }
      if (result.data.type=='publisher_data_changed')
      {
        this.update_subscriptions(result.data);
      }
      if (result.data.type=='subscriber_response')
      {
        this.update_publishers(result.data);
      }
      if (result.data.type=='update_list')
      {
        if (result.data.row>=0)
        {
          this.list_content[result.data.row]=result.data.data;
          this.list_content=[...this.list_content];
          this.data[this.definition.data_field]=this.list_content;
        }
        else
        {
          result.data.data.unique_id=uuidv4();
          this.list_content.push(result.data.data);
          this.list_content=[...this.list_content];
          this.data[this.definition.data_field]=this.list_content;
        }
        this.calculateTotals();
      }
    })
  }

  ngOnInit(): void {

  }


  publish_subscription()
  {
    if (this.definition.subscribe!=undefined&&this.definition.subscribe!=null)
    {
      this.subscribe_from=[];
      this.subscribe_from.push({key:this.definition.subscribe,target:''});
      this.event.cast('list_interchange',{key:this.unique_id,property:this.definition.subscribe});
    }
  }

  buttonclick(event:any)
  {
    if (event.rowindex>=0&&this.selectionmode=='single')
    {
      this.list_selected=this.list_content[event.rowindex];
    }
    this.sendEvent(event.rowindex,event.button.action_key);
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
      case 'delete':
        this.deleteRecord(action.url,action.confirm_message,id);
        break;
      case 'dialog':
        this.event.cast('top',{from:this.unique_id,action:'dialog',key:action.dialog_key,id:id,cache:this.cacheid,row:rowIndex,content:data,source_type:this.source_type,parent_id:this.data?.id});
        break;
      case 'goto':
        this.event.cast('top',{from:this.unique_id,action:'goto',key:action.url,id:id,source_type:this.source_type});
        break;
      case 'note':
        this.event.cast('top',{from:this.unique_id,action:'note',id:id,source_type:data.action_uri.type,data:data});
        break;
      case 'info':
        this.event.cast('top',{from:this.unique_id,action:'info',data:data});
        break;
      case 'import':
        this.event.cast('top',{from:this.unique_id,action:'import',source_type:this.list_source_type+(this.source_type.length==0?"":"."+this.source_type)});
        break;
      case 'post':
        this.postRecords(action.url,action.confirm_message,rowIndex,data);
        break;
    }
  }

  resolveColumns(cols:any[])
  {
    if (cols!=undefined)
    {
      return cols.filter(p=>p.visible==true);
    }else
    {
      return [];
    }

  }


  postRecords(url:string,message:string,rowIndex:number,data:any)
  {
    if (message==undefined||message==null)
    {
      this.postRecordsAction(url,rowIndex,data);
    }else
    {
      this.comfirm.confirm({message:message,accept:()=>{
        this.postRecordsAction(url,rowIndex,data);
      }})
    }
  }

  postRecordsAction(url:string,rowIndex:number,data:any)
  {
    this.posting_list=[];
    if (rowIndex>=0)
    {
      this.posting_list.push(data);
    }else
    {
      for(var item of this.list_selected)
      {
        if (item!=null)
        {
          this.posting_list.push(item);
        }
      }
    }
    this.posting_action={url:url,source_type:this.source_type};
    this.posting_active=true;
  }

  returnfrompost()
  {
    this.posting_active=false;
  }

  paginate(event:any)
  {
    this.current_page=event.page+1;
    this.refresh(event.page+1,this.current_filters);
  }

  paginate2(event:any)
  {
    this.current_page=event;
    this.refresh(this.current_page,this.current_filters);
  }

  deleteRecord(url:string,message:string,id:number)
  {
      this.comfirm.confirm({message:message,accept:()=>{
      }}
      );
  }

  resolveSort(column:any):any
  {
    if (column.sortable!=true){return null;}
    return column.field;
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
      if (this.list_content!=undefined)
      {
        this.record_count=this.list_content.length;
      }
      this.calculateTotals();
    }
    if (this.definition.data_url!=undefined&&this.definition.data_url!=null)
    {
      this.refreshFromUrl(pageno,this.current_filters);
    }
  }

  getTotal(key:string,column:any):number
  {
    var result=0;
    var configs:any={};
    if (column.context_param!=undefined&&column.context_param!=null)
    {
      configs=JSON.parse(column.context_param);
    }
    var check=this.list_totals.filter(p=>p.key==key)[0];
    if (check!=null)
    {
      result=check.value*(configs.reverse!=undefined?configs?-1:1:1);
    }

    return result;
  }

  resolveHCFilters(filters:any[])
  {
      for(var item of this.hard_coded_filters)
      {
        filters.push({type:item.type,column:item.fieldname,value:item.value});
      }
      return filters;
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
      var local_filters=this.tool.deepCopy(filters);
      if (this.hard_coded_filters.length>0)
      {
         if (local_filters==null){local_filters=[];}
          local_filters=this.resolveHCFilters(local_filters);
      }
      this.loader.startLoader(this.loader_key);
      const local=this;
      const dir:string=this.definition.direction==undefined||this.definition.direction==1?"asc":"desc";
      this.dataService.list(url,this.definition.page_size,pageno,this.definition.sort_key,dir,local_filters)
      .subscribe(
        {
          next:(result:any)=>{
              this.list_content=result.records;
              this.list_totals=result.totals;
              this.record_count=result.totalrecords;
              this.current_page=result.page;
              this.list_source_type=result.source_type;
              this.list_selected=null;
              this.list_selection_changed.emit({type:this.source_type,subtype:this.list_source_type,value:null});
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

