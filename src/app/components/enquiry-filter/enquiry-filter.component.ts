import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-enquiry-filter',
  templateUrl: './enquiry-filter.component.html',
  styleUrls: ['./enquiry-filter.component.scss']
})
export class EnquiryFilterComponent implements OnInit,OnChanges {

  @Input() search_model:any;
  @Output() search_changed:EventEmitter<any>=new EventEmitter<any>();

  public current_item:any;
  public configs:any;
  public selected_items:any[];
  public definition:any;
  public available:any[];
  public blocked:boolean=false;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['search_model'])
      {
        this.resolveUriModel();
      }
  }

  resolveUriModel()
  {
    this.selected_items=[];
    for(var item of this.search_model.search_options)
    {
      if (item.value!=undefined&&item.value!=null)
      {
        this.selected_items.push(item);
      }
    }
    this.search_model.selected=this.selected_items;
    this.search_changed.emit(this.selected_items);
  }

  ngOnInit(): void {
  }

  search(search:any)
  {
    console.log(this.search_model);
    this.available=this.search_model.search_options.filter(p=>p.code.includes(search.query)||p.description.includes(search.query));
  }

  raise_change_event(){

  }
  initialise_change_event(){

  }

  removeitem(item:any)
  {
      this.search_model.selected=this.selected_items;
      this.search_changed.emit(this.selected_items);
  }

  additem(item:any)
  {
    item.value=null;
  }

  setCurrent(lookup:any)
  {
    this.current_item=lookup;
    console.log(this.current_item);
    this.definition={data_url_method:this.current_item.method,data_url:this.current_item.url,data_url_param:this.current_item.url_params};
    this.configs={label:'description',id:'id'};
  }

  item_selected_on_list(value)
  {
      this.current_item.value=value;
      this.search_model.selected=this.selected_items;
      this.search_changed.emit(this.selected_items);
  }

  checkSourceType():string
  {
      return '';
  }

}
