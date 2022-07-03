import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagecolumn-outline',
  templateUrl: './pagecolumn-outline.component.html',
  styleUrls: ['./pagecolumn-outline.component.scss']
})
export class PagecolumnOutlineComponent implements OnInit {

  @Input() columns:any[]=[];

  public column_edit_display:boolean=false;
  public edited_column:any=null;
  public edited_row:number=0;

  constructor() { }





  ngOnInit(): void {
  }

  addColumn()
  {
    this.edited_row=-1;
    this.edited_column={id:0,description:'',show_description:false,panels:[]}
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
    this.columns.splice(row,1);
    this.columns=[...this.columns];
  }

  saveColumn()
  {
      if (this.edited_row==-1)
      {
        this.columns.push({...this.edited_column});
      }else
      {
        this.columns[this.edited_row]={...this.edited_column};
      }
      this.edited_column=null;
      this.column_edit_display=false;
      this.columns=[...this.columns];
  }

  moveup(row:number,column:any)
  {
    if (row==0){return;}
    this.columns.splice(row,1);
    this.columns.splice(row-1,0,column);
    this.setRows();
    this.columns=[...this.columns];
  }

  setRows()
  {
    var idx=0;
    for(var item of this.columns)
    {
        item.sort_order=idx;
        idx++;
    }
    console.log(this.columns);
  }

  movedown(row:number,column:any)
  {
    if (row==this.columns.length-1){return;}
    this.columns.splice(row,1);
    this.columns.splice(row+1,0,column);
    this.setRows();
    this.columns=[...this.columns];
  }

}
