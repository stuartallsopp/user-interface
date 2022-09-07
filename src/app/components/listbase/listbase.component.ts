import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { ToolService } from 'src/app/services/tool.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-listbase',
  templateUrl: './listbase.component.html',
  styleUrls: ['./listbase.component.scss']
})
export class ListbaseComponent implements OnInit,OnDestroy,OnChanges {


  @Input() definition:any;
  @Input() data:any;
  @Input() cacheid:string="";
  @Input() source_type:string="";
  @Output() list_selection_changed:EventEmitter<any>=new EventEmitter<any>();

  public loader_key:string="";
  public unique_id:string=uuidv4();
  public event_subscriber:any;
  public data_interchange_subscriber:any;
  public publish_to:any[]=[];
  public subscribe_from:any[]=[];

  public buttons_published:boolean=false;
  public selectionmode:string="";
  public list_content:any[]=null;
  public list_selected:any[]=[];
  public footer_columns:any[]=[];
  public list_totals:any[]=[];
  public list_source_type:string="";
  public fetching:boolean=false;
  public record_count:number=0;
  public hasfilters:boolean=false;
  public hard_coded_filters:any[]=[];
  public filters:any[]=[];
  public current_page:number=1;
  public current_filters:any=null;
  public selected_period_object:any={period_id:'current'};
  
  constructor(
    public dataService:DataService,
    public loader:NgxUiLoaderService,
    public event:NgEventBus,
    public mess:MessageService,
    public confirm:ConfirmationService,
    public tool:ToolService
    ) {

   }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.loader_key="list_"+this.definition.id;
      this.publishButtons();
      this.resolvepublication();
      this.event_subscription();
      this.publish_subscription();
    }
    
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

  ngOnInit(): void {

    
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
        var url=filter.definition_url;
        url=url.replace("{source_type}",this.source_type);
        this.dataService.post(url,{items:filter.items}).subscribe({
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



  publish_subscription()
  {
    if (this.definition.subscribe!=undefined&&this.definition.subscribe!=null)
    {
      this.subscribe_from=[];
      this.subscribe_from.push({key:this.definition.subscribe,target:''});
      this.event.cast('list_interchange',{key:this.unique_id,property:this.definition.subscribe,description:this.definition.description});
    }
  }

  buttonclick(event:any)
  {
    if (event.rowindex>=0&&this.selectionmode=='single')
    {
      this.list_selected=this.list_content[event.rowindex];
      this.line_selected();
    }
    this.sendEvent(event.rowindex,event.button.action_key);
  }

  publishButtons()
  {
    if (this.buttons_published==false&&(this.definition.subscribe==undefined||this.definition.subscribe==null))
    {
      this.event.cast('actionpanel',{from:this.unique_id,buttonset:this.definition.buttonset});
    }
  }

  refresh(page:number=0,filters:any=null)
  {

  }

  filterChanged(filters:any)
  {
    this.current_filters=filters;
    this.refresh(1);
  }

  update_period_object(data:any)
  {
    this.selected_period_object.period_id=data.period.id;
  }

  update_period_search(data:any)
  {
    if (this.filters==null){this.filters=[];}
    var check=this.filters.filter(p=>p.column=='period_id')[0];
    if (check==null)
    {
      check={column:'period_id',type:'equals',value:data.period.id};
      this.filters.push(check);
    }else
    {
      check.value=data.period.id;
    }
    this.selected_period_object.period_id=data.period.id;
    var check=this.filters.filter(p=>p.column=='year_id')[0];
    if (check==null)
    {
      check={column:'year_id',type:'equals',value:data.period.year_id};
      this.filters.push(check);
    }else
    {
      check.value=data.period.year_id;
    }
    this.refreshFromUrl(0,this.filters);
  }

  event_subscription()
  {
    this.data_interchange_subscriber=this.event.on('list_interchange').subscribe(result=>{
        if (this.publish_to.length>0)
        {
          this.check_publish_list(result.data);
        }
    });
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
      if (result.data.type=='global_period_changed')
      {
        this.update_period_search(result.data);
      }
      if (result.data.type=='global_period_initialise')
      {
        this.update_period_object(result.data);
      }
      if (result.data.type=='subscriber_response')
      {
        this.update_publishers(result.data);
      }
      if (result.data.type=='update_from_child')
      {
        var idx=this.list_content.indexOf(this.list_selected);
        this.list_content[idx]=result.data.data;
        this.list_selected=this.list_content[idx];
        this.data[this.definition.data_field]=this.list_content;
        this.push_change_up_chain();
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
        this.push_change_up_chain();
        this.calculateTotals();
      }
    })
  }

  resolvepublication()
  {
    if (this.definition.publish!=undefined&&this.definition.publish!=null)
    {
      var targets=this.definition.publish.split(',');
      this.publish_to=[];
      for(var target of targets)
      {
          this.publish_to.push({'source':target,key:'',descripton:''});
      }
    }
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

  push_change_up_chain()
  {
    if (this.subscribe_from.length>0)
    {
      for(var sub of this.subscribe_from)
      {
        this.event.cast(sub.target,{type:'update_from_child',property:sub.key,data:this.data});
      }
    }else
    {
        console.log(this.data);
    }
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

  resolveSubcriptionName()
  {
    if (this.subscribe_from==undefined||this.subscribe_from==null||this.subscribe_from.length==0){return null;}
    return this.subscribe_from[0].description;
  }

  line_selected(){}
  calculateTotals(){}

  update_subscriptions(source:any)
  {
    if (source.data==null)
    {
      this.list_content=null;
      this.record_count=0;
      this.list_selected=null;
      this.line_selected();
    }else
    {
      this.data={...source.data};
      this.list_content=source.data[this.definition.data_field];
      this.list_content=[...this.list_content];
      this.record_count=this.list_content.length;
      this.list_selected=null;
      this.line_selected();
    }
    this.calculateTotals();
  }

  onCellButtonClick(event:any)
  {
    console.log(event);
    var configs=event.config;
    switch(configs.action)
    {
      case 'redirect':
        var url=this.tool.stringReplace(configs.url,[event.data,this.selected_period_object]);
        this.event.cast("top",{action:'redirect',url:url});
        break;
    }
  }

  check_publish_list(source:any)
  {
    var check=this.publish_to.filter(p=>p.source==source.property)[0];
    if (check!=null)
    {
      check.key=source.key;
      check.description=source.description;
      this.event.cast(check.key,{type:'subscriber_response',key:this.unique_id,property:check.source,description:this.definition.description});
    }
  }

  processEvent(id:number,action:any,rowIndex:number,data:any)
  {
    var source_type=this.source_type;
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
      case 'info':
        this.event.cast('top',{from:this.unique_id,action:'info',data:data});
        break;
      case 'import':
        this.event.cast('top',{from:this.unique_id,action:'import',source_type:this.list_source_type+(this.source_type.length==0?"":"."+this.source_type)});
        break;
    }
  }

  resolveHCFilters(filters:any[])
  {
      for(var item of this.hard_coded_filters)
      {
        filters.push({type:item.type,column:item.fieldname,value:item.value});
      }
      return filters;
  }

  refreshFromUrl(pageno:number=1,filters:any=null,append:boolean=false)
  {
    this.fetching=true;
    if (this.definition.data_url?.length>0)
    {
      var url=this.tool.resolveUrl(this.definition.data_url,this.source_type,this.list_source_type,0);

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
            if (append==false)
            {
              this.list_content=result.records;
            }else
            {
              this.list_content.push(...result.records);
              this.list_content=[...this.list_content];
            }
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
