import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InputText } from 'primeng/inputtext';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DataService } from 'src/app/services/data.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-ac-single-search',
  templateUrl: './ac-single-search.component.html',
  styleUrls: ['./ac-single-search.component.scss']
})
export class AcSingleSearchComponent implements OnInit,AfterViewInit {

  constructor(private dataService:DataService,private element:ElementRef,private loading:NgxUiLoaderService,private tool:ToolService) { }
  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
    this.reset_search();
  }

  @HostBinding('tabindex') public tabindex = 0;
  @ViewChild(InputText) search_box:any;
  @Input() configs:any;
  @Input() definition:any;
  @Input() lock_active_only:boolean=true;
  @Input() hasnew:boolean=false;
  @Input() data:any;
  @Input() parentdata:any;
  @Input() source_type:string="";
  @Input() local_source_type:string="";
  @Input() dialog?:OverlayPanel;
  @Input() title:string="";
  @Output() item_selected:EventEmitter<any>=new EventEmitter<any>();
  @Output() new_record_selected:EventEmitter<any>=new EventEmitter<any>();

  public search_results:any[]=[];
  public total_records:number=0;

  public search_text:string="";
  public selected_item:any=null;
  public active_only:boolean=true;
  public loader_key:string="list_search";

  ngOnInit(): void {

  }

  newRecord()
  {
    this.new_record_selected.emit();
  }

  reset_search()
  {
    this.search_text="";
    this.selected_item=null;
    this.resolveSearch();

  }

  selectFromList(event:any)
  {
    this.item_selected.emit(event.value);
    this.dialog?.hide();
    
  }

  resolveSearch()
  {
    var search={query:this.search_text};
    this.search(search);
  }

  search(event:any)
  {
      if (this.definition.data_url_method=="POST")
      {
        this.search_post(event.query);
      }
  }

  search_post(query:string)
  {
      var search_param=JSON.parse(this.definition.data_url_param);

      var search:any[]=[];
      if (search_param.search)
      {
        search.push({type:"contains","column":search_param.search,"value":query});
      }
      var url=this.definition.data_url;
      if (this.parentdata!=null)
      {
        url=url.replace("{id}",this.parentdata.id);
      }
      if (this.local_source_type!=undefined&&this.local_source_type!=null&&this.local_source_type!="")
      {
        url=url.replace("{source_type}",this.local_source_type);  
      }
      url=url.replace("{source_type}",this.source_type);
      url=url.replace("{active_only}",this.active_only?"true":"false");
      url=this.tool.stringReplace(url,[this.data,this.parentdata]);
      this.dataService.list(url,50,0,search_param.order,"asc",search).subscribe(
        {
          next:(result:any)=>{
            this.search_results=result.records;
            this.total_records=result.totalrecords;
          }
        }
      )
  }
}
