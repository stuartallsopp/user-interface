import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
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

  public unique_id:string=uuidv4();
  public selectionmode:string="";
  public list_content:any[]=[];
  public list_selected:any[]=[];
  public footer_columns:any[]=[];
  public list_totals:any[]=[];
  public record_count:number=0;
  public hasfilters:boolean=false;
  public filters:any[]=[];
  private current_filters:any=null;

  private event_subscriber:any;

  constructor(
    private dataService:DataService,
    private loader:NgxUiLoaderService,
    private event:NgEventBus,
    private mess:MessageService,
    private comfirm:ConfirmationService
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
    }
    if (changes['definition']||changes['data'])
    {
      this.checkFilters();
    }
  }

  filterChanged(filters:any)
  {
    console.log(filters);
    this.current_filters=filters;
    this.refresh(0);
  }

  checkFilters()
  {
    if (this.definition.filters.length==0){this.refresh();}else{
      var filter=this.definition.filters[0];
      this.dataService.post(filter.definition_url,{items:filter.items}).subscribe({
        next:(result:any)=>{
          console.log(result);
          this.hasfilters=true;
          this.filters=result.items;
        },
        error:(error)=>{
  
        }
      })
    }
    
  }



  resolveFooterColumns()
  {
    if (!this.definition){return;}
    this.footer_columns=[];
    var columns=this.definition.columnset?.list_columns;
    if (columns)
    {
      if (columns.filter((p: { total: boolean; })=>p.total==true).length==0)
      {
        this.footer_columns.push({type:'totalrecords',key:null,colspan:columns.length});
      }else
      {
        var first=columns.filter((p: { total: boolean; })=>p.total==true)[0];
        var indxof=columns.indexOf(first);
        this.footer_columns.push({type:'totalrecords',key:null,colspan:indxof});
        while(indxof<columns.length)
        {
          if (columns[indxof].total==true)
          {
            this.footer_columns.push({type:'total',key:columns[indxof].field,colspan:1,format:columns[indxof].format});
          }else
          {
            this.footer_columns.push({type:'empty',key:null,colspan:1});
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
        this.refresh();
      }
      if (result.data.type=='update_list')
      {
        if (result.data.row>=0)
        {
          this.list_content[result.data.row]=result.data.data;
          this.list_content=[...this.list_content];
          this.data[this.definition.data_field]=this.list_content;
        }
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
        this.event.cast('top',{from:this.unique_id,action:'dialog',key:action.dialog_key,id:id,cache:this.cacheid,row:rowIndex,content:data,source_type:this.source_type});
        break;
      case 'goto':
        this.event.cast('top',{from:this.unique_id,action:'goto',key:action.url,id:id,source_type:this.source_type});
        break;
      case 'note':
        console.log(data);
        this.event.cast('top',{from:this.unique_id,action:'note',id:id,source_type:data.action_uri.type,data:data});
        break;
    }
  }

  paginate(event:any)
  {
    this.refresh(event.page+1,this.current_filters);
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
    }else
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

  refreshFromUrl(pageno:number=1,filters:any=null)
  {
    console.log(filters);
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
      this.dataService.list(url,this.definition.page_size,pageno,this.definition.sort_key,dir,filters)
      .subscribe(
        {
          next:(result:any)=>{
              this.list_content=result.records;
              this.list_totals=result.totals;
              this.record_count=result.totalrecords;
          },
          error:(error)=>{
            local.loader.stopLoader(local.loader_key);
          },
          complete() {
            local.loader.stopLoader(local.loader_key);
          },
        }
      )
    }
  }

}

