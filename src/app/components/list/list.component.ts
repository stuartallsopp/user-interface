import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
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

  public loader_key:string="";

  private buttons_published:boolean=false;
  public unique_id:string=uuidv4();
  public selectionmode:string="";
  public list_content:any[]=[];
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

  private event_subscriber:any;

  constructor(
    private dataService:DataService,
    private loader:NgxUiLoaderService,
    private event:NgEventBus,
    private mess:MessageService,
    private comfirm:ConfirmationService,
    private tool:ToolService
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
      this.resolveFooterColumns();
      this.resolveselectionMode();
      this.publishButtons();
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

  checkFilters()
  {
    if (this.definition.filters.length==0){
      this.refresh();
    }
    else
    {
      var filter=this.definition.filters.filter((p: { type: string; })=>p.type=='url')[0];
      console.log(filter);
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
    console.log(this.definition.filters);
    var hc=this.definition.filters.filter((p: { type: string; })=>p.type=='hard')[0];
    if (hc!=null)
    {
      console.log(hc);
      this.hard_coded_filters=JSON.parse(hc.hard_coded);
      console.log(this.hard_coded_filters);
    }
  }

  publishButtons()
  {
    if (this.buttons_published==false)
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
            this.footer_columns.push({type:'total',key:columns[indxof].field,colspan:1,format:columns[indxof].format,visible:columns[indxof].visible});
          }else
          {
            this.footer_columns.push({type:'empty',key:null,colspan:1,visible:columns[indxof].visible});
          }
          indxof++;
        }
      }
    }
    console.log(this.footer_columns);

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

  event_subscription()
  {
    this.event_subscriber=this.event.on(this.unique_id).subscribe(result=>{
      if (result.data.type=='redraw')
      {
        this.refresh(this.current_page);
      }
      if (result.data.type=='listbuttonclick')
      {
        this.sendEvent(-1,result.data.button.action_key);
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
    this.event_subscription();
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
    return cols.filter(p=>p.visible==true);
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
    var workinglist:any[]=[];
    if (rowIndex>=0)
    {
      workinglist.push(data);
    }else
    {
      for(var item of this.list_selected)
      {
        if (item!=null)
        {
          workinglist.push(item);
        }
      }
    }
      if (workinglist.length==0)
      {
        this.mess.add({severity:'error',detail:'Nothing has been selected to post',summary:'Processing Error',key:'standard'});
        return;
      }
      var id_list:number[]=[];
      for(var item of workinglist)
      {
        id_list.push(item.id);
      }
      url=url.replace('{source_type}',this.source_type);
      this.event.cast("top",{action:'open_progress'});
      this.dataService.post(url,{ids:id_list}).subscribe({next:(result)=>{
          this.event.cast('top',{action:'close_progress'});
          this.refresh();
      },
      error:(error)=>{
        this.mess.add({severity:'error',key:'standard',detail:error.message,summary:'Posting Error'});
        this.event.cast('top',{action:'close_progress'});
      }});
    
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
      this.record_count=this.list_content.length;
      this.calculateTotals();
    }
    if (this.definition.data_url!=undefined&&this.definition.data_url!=null)
    {
      this.refreshFromUrl(pageno,this.current_filters);
    }
  }

  getTotal(key:string):number
  {
    var result=0;
    var check=this.list_totals.filter(p=>p.key==key)[0];
    if (check!=null)
    {
      result=check.value;
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
              console.log(result);
              this.list_content=result.records;
              this.list_totals=result.totals;
              this.record_count=result.totalrecords;
              this.current_page=result.page;
              this.list_source_type=result.source_type;
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

