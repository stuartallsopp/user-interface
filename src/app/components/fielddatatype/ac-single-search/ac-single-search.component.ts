import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InputText } from 'primeng/inputtext';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ac-single-search',
  templateUrl: './ac-single-search.component.html',
  styleUrls: ['./ac-single-search.component.scss']
})
export class AcSingleSearchComponent implements OnInit,AfterViewInit {

  constructor(private dataService:DataService,private element:ElementRef,private loading:NgxUiLoaderService) { }
  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
    this.reset_search();
  }

  @HostBinding('tabindex') public tabindex = 0;
  @ViewChild(InputText) search_box:any;
  @Input() configs:any;
  @Input() definition:any;
  @Input() hasnew:boolean=false;
  @Input() dialog?:OverlayPanel;
  @Output() item_selected:EventEmitter<any>=new EventEmitter<any>();
  @Output() new_record_selected:EventEmitter<any>=new EventEmitter<any>();

  public search_results:any[]=[];
  public total_records:number=0;

  public search_text:string="";
  public selected_item:any=null;
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
        search.push({type:"begins","column":search_param.search,"value":query});
      }

      this.dataService.list(this.definition.data_url,50,0,search_param.order,"asc",search).subscribe(
        {
          next:(result:any)=>{
            this.search_results=result.records;
            this.total_records=result.totalrecords;
          }
        }
      )
  }
}
