import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { PageService } from 'src/app/services/page.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit,OnDestroy {


  public current_route:any;
  public page_definition:any;
  public footer_columns:any[]=[];
  public module:string;
  public current_page:number=0;
  public list_data:any[]=[];
  public record_count:number=0;
  public list_totals:any=[];
  public current_ledger:string;
  public search_model:any;
  private route_subscription:any;
  public params:any[];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private page:PageService,
    private event:NgEventBus,
    private loader: NgxUiLoaderService,
    public responsive: ResponsiveService,
    private dataService: DataService,
    public tool: ToolService
  ) { }
  ngOnDestroy(): void {
    this.route_subscription=null;
  }

  ngOnInit(): void {
    this.route_subscriber();
  }

  route_subscriber()
  {
    this.route_subscription=this.route.queryParamMap.subscribe({next:(result:any)=>{
      if (result.params?.ledger!=undefined&&result.params?.ledger!=""){
        this.current_ledger="ANY";
      }
      if (result.params?.ledger!=this.current_ledger){
        this.current_ledger=result.params?.ledger;
      }
      this.fetchPage(result.params,this.current_ledger);
    }});
  }

  period_changed()
  {
    console.log('period_changed');
    this.runsearch();
  }

  search_changed(source)
  {
    console.log('search changed',source);
    this.search_model.selected=source;
    this.runsearch();
  }

  runsearch()
  {
    var search:any[]=[];
    if (this.search_model.ledger!="ANY"){
      search.push({type:'equals',column:'transaction_ledger',value:this.search_model.ledger});
    };
    search.push({type:'resolve',column:'period_from',value:this.search_model.period_from});
    search.push({type:'resolve',column:'period_to',value:this.search_model.period_to});
    if (this.search_model.selected!=undefined&&this.search_model.selected!=null)
    {
      for(var item of this.search_model.selected)
      {
          if (item.field!=undefined&&item.field!=null)
          {
            search.push({type:'equals',column:item.field,value:item.value.id});
          }
          else
          {
            search.push({'type':'resolve',column:item.code,value:item.value.id});
          }
      }
    }
    this.dataService.list("enquiry/search",50,0,"detail_audit","asc",search,false).subscribe({next:(result)=>{
      this.list_data=[...result.records];
      this.record_count=result.totalrecords;
      this.list_totals=result.totals;
      this.current_page=result.page;
    }})
  }

  ledger_changed()
  {
    this.initialiseSettings({period_from:'current',period_to:'current'},this.search_model.ledger);
  }

  buttonclick(event:any)
  {

  }

  resolveFooterColumns()
  {
    if (!this.page_definition){return;}
    this.footer_columns=[];
    var columns=this.page_definition.panels[0].list.columnset?.list_columns.filter((p: { visible: boolean; })=>p.visible==true);
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

  sortlist(event:any)
  {

  }

  fetchPage(params:any,ledger:string)
  {
    this.page.getbykey("enquiry").subscribe({next:(result)=>{
      this.page_definition=result;
      this.resolveFooterColumns();
      this.initialiseSettings(params,ledger);
    }})
  }

  initialiseSettings(params:any,ledger:string)
  {

    var payload={ledger:ledger,period_from:'',period_to:'',year_to:'',options:[]};
    for(const prop in params)
    {
      if (prop!='period_from'&&prop!='period_to'&&prop!='ledger'&&prop!='year_to')
      {
        payload.options.push({type:prop,code:params[prop]})
      }
    }
    if (params?.period_from!=undefined&&params?.period_from!=null){payload.period_from=params.period_from;}
    if (params?.period_to!=undefined&&params?.period_to!=null){payload.period_to=params.period_to;}
    if (params?.year_to!=undefined&&params?.year_to!=null){payload.year_to=params.year_to;}
    this.dataService.post("enquiry/initialise",payload).subscribe({next:(result)=>{
        this.search_model=result;
        this.search_model={...this.search_model};
    }});
  }
}
