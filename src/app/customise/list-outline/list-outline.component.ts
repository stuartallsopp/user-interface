import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-list-outline',
  templateUrl: './list-outline.component.html',
  styleUrls: ['./list-outline.component.scss']
})
export class ListOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Input() columnlist:any;
  @Input() buttonlist:any;
  @Input() actionlist:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  public filter_edit_display:boolean=false;
  public edited_filter:any=null;
  public edited_row:number=0;

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }


  updateEdit()
  {
      this.dataService.update_list(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }

  addFilter()
  {
    this.edited_row=-1;
    this.edited_filter={id:0,definition_url:'',items:[]}
    this.filter_edit_display=true;
  }

  addFilterItem()
  {
      this.edited_filter.items.push({id:0,type:''});
      this.edited_filter.items=[...this.edited_filter.items];
  }

  editFilter(filter:any,row:number)
  {
    this.edited_row=row;
    this.edited_filter={...filter};
    this.filter_edit_display=true;
  }

  deleteFilter(filter:any,row:number)
  {
    this.fullPage.filters.splice(row,1);
    this.fullPage.filters=[...this.fullPage.filters];
  }

  deleteFilterItem(item:any,row:number)
  {
    this.edited_filter.items.splice(row,1);
    this.edited_filter.items=[...this.edited_filter.items];
  }

  moveup(row:number,filter:any)
  {
    if (row==0){return;}
    this.fullPage.filters.splice(row,1);
    this.fullPage.filters.splice(row-1,0,filter);
    this.setRows();
    this.fullPage.filters=[...this.fullPage.filters];
  }

  saveFilter()
  {
      if (this.edited_row==-1)
      {
        this.fullPage.filters.push({...this.edited_filter});
      }else
      {
        this.fullPage.filters[this.edited_row]={...this.edited_filter};
      }
      this.edited_filter=null;
      this.filter_edit_display=false;
      this.fullPage.filters=[...this.fullPage.filters];
  }

  setRows()
  {
    var idx=0;
    for(var item of this.fullPage.filters)
    {
        item.sort_order=idx;
        idx++;
    }
    console.log(this.fullPage.filters);
  }

  movedown(row:number,filter:any)
  {
    if (row==this.fullPage.filters.length-1){return;}
    this.fullPage.filters.splice(row,1);
    this.fullPage.filters.splice(row+1,0,filter);
    this.setRows();
    this.fullPage.filters=[...this.fullPage.filters];
  }
}
