import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ToolService } from 'src/app/services/tool.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit,OnChanges,OnDestroy {

  @Input() definition:any;
  @Input() data:any;
  @Input() source_type:string="";

  public hard_coded_filters:any[]=[];


  public chart_set:any;

  public data_set:any;
  public chart_data:any;

  public config:any; 



  public loader_key:string="";
  public unique_id:string=uuidv4();
  private subscribe_from:any[]=[];
  private filters:any[]=[];

  private event_subscriber:any;
  private data_interchange_subscriber:any;

  constructor(
    private dataService:DataService,
    private loader:NgxUiLoaderService,
    private event:NgEventBus,
    private mess:MessageService,
    private confirm:ConfirmationService,
    private tool:ToolService
    ) {

   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['definition'])
      {
        this.loader_key="chart_"+this.definition.id;
        this.event_subscription();
        this.publish_subscription();
        this.refresh();
      }
  }

  

  display_chart(event)
  {
    console.log(event);
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

  refresh()
  {
    this.refreshFromUrl();
  }

  event_subscription()
  {
    this.event_subscriber=this.event.on(this.unique_id).subscribe(result=>{
      if (result.data.type=='redraw')
      {
        this.refresh();
      }
      if (result.data.type=='global_period_changed')
      {
        this.update_period_search(result.data);
      }
    })
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
    var check=this.filters.filter(p=>p.column=='year_id')[0];
    if (check==null)
    {
      check={column:'year_id',type:'equals',value:data.period.year_id};
      this.filters.push(check);
    }else
    {
      check.value=data.period.year_id;
    }
    this.refreshFromUrl(this.filters);
  }

  resolveHCFilters(filters:any[])
  {
      for(var item of this.hard_coded_filters)
      {
        filters.push({type:item.type,column:item.fieldname,value:item.value});
      }
      return filters;
  }

  refreshFromUrl(filters:any[]=null)
  {
      this.loader.startLoader(this.loader_key);
      var url=this.tool.resolveUrl(this.definition.data_url,this.source_type,'',0);

      url=url.replace('{chart_type}',this.definition.type);

      var local_filters=this.tool.deepCopy(filters);

      if (this.hard_coded_filters.length>0)
      {
         if (local_filters==null){local_filters=[];}
          local_filters=this.resolveHCFilters(local_filters);
      }
      const local=this;
      const dir:string=this.definition.direction==undefined||this.definition.direction==1?"asc":"desc";
      this.dataService.list(url,0,0,this.definition.sort_key,dir,local_filters)
      .subscribe(
        {
          next:(result:any)=>{
              this.chart_set=result;
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

}
