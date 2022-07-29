import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-column-outline',
  templateUrl: './column-outline.component.html',
  styleUrls: ['./column-outline.component.scss']
})
export class ColumnOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Input() lookuplist:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  public column_edit_display:boolean=false;
  public edited_column:any=null;
  public edited_row:number=0;
  

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }

  updateEdit()
  {
      this.dataService.update_column(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }

  addColumn()
  {
    this.edited_row=-1;
    this.edited_column={id:0,label:'',field:'',alignment:'L',format:'',type:'tex_disp',sortable:true,searchable:false,filterable:false,suffix:'',lookupid:null,total:false};
    this.column_edit_display=true;
  }

  editColumn(column:any,row:number)
  {
    this.edited_row=row;
    this.edited_column={...column};
    this.column_edit_display=true;
  }

  deleteColumn(column:any,row:number)
  {
    this.fullPage.list_columns.splice(row,1);
    this.fullPage.list_columns=[...this.fullPage.list_columns];
  }

  saveColumn()
  {
      if (this.edited_row==-1)
      {
        this.fullPage.list_columns.push({...this.edited_column});
      }else
      {
        this.fullPage.list_columns[this.edited_row]={...this.edited_column};
      }
      this.edited_column=null;
      this.column_edit_display=false;
      this.fullPage.list_columns=[...this.fullPage.list_columns];
  }

  moveup(row:number,column:any)
  {
    if (row==0){return;}
    this.fullPage.list_columns.splice(row,1);
    this.fullPage.list_columns.splice(row-1,0,column);
    this.setRows();
    this.fullPage.list_columns=[...this.fullPage.list_columns];
  }

  setRows()
  {
    var idx=0;
    for(var item of this.fullPage.list_columns)
    {
        item.sort_order=idx;
        idx++;
    }
  }

  movedown(row:number,column:any)
  {
    if (row==this.fullPage.list_columns.length-1){return;}
    this.fullPage.list_columns.splice(row,1);
    this.fullPage.list_columns.splice(row+1,0,column);
    this.setRows();
    this.fullPage.list_columns=[...this.fullPage.list_columns];
  }


}
