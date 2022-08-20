import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { ToolService } from 'src/app/services/tool.service';
import { ListbaseComponent } from '../listbase/listbase.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListbaseComponent implements OnInit,OnChanges,OnDestroy {




  public posting_list:any[]=[];
  public posting_active:boolean=false;
  public posting_action:any=null;



  constructor(
    dataService:DataService,
    loader:NgxUiLoaderService,
    event:NgEventBus,
    mess:MessageService,
    confirm:ConfirmationService,
    tool:ToolService,
    private post:PostService
    ) {
      super(dataService,loader,event,mess,confirm,tool);
   }
  override ngOnDestroy(): void {

    super.ngOnDestroy();

  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes['definition'])
    {
      this.resolveFooterColumns();
      this.resolveselectionMode();

    }
    if (changes['definition']||changes['data'])
    {
      this.checkFilters();
    }
  }


  override calculateTotals()
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

  override line_selected()
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


  
  override ngOnInit(): void {
    super.ngOnInit();
  }



  override processEvent(id:number,action:any,rowIndex:number,data:any)
  {
    super.processEvent(id,action,rowIndex,data);
    var source_type=this.source_type;
    switch (action.type)
    {
      case 'delete':
        this.deleteRecord(action.url,action.confirm_message,id);
        break;
      case 'post':
        this.postRecords(action.url,action.confirm_message,rowIndex,data);
        break;
    }
  }

  postRecords(url:string,message:string,rowIndex:number,data:any)
  {
    if (message==undefined||message==null)
    {
      this.postRecordsAction(url,rowIndex,data);
    }else
    {
      this.confirm.confirm({message:message,accept:()=>{
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


  paginate2(event:any)
  {
    this.current_page=event;
    this.refresh(this.current_page,this.current_filters);
  }

  deleteRecord(url:string,message:string,id:number)
  {
      this.confirm.confirm({message:message,accept:()=>{
      }}
      );
  }


  override refresh(pageno:number=1,filters:any=null)
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
 

}

