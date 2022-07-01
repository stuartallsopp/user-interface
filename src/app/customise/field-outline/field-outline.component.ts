import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-field-outline',
  templateUrl: './field-outline.component.html',
  styleUrls: ['./field-outline.component.scss']
})
export class FieldOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Input() lookuplist:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  public field_edit_display:boolean=false;
  public edited_field:any=null;
  public edited_row:number=0;

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }


  updateEdit()
  {
      this.dataService.update_field(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }

  addButton()
  {
    this.edited_row=-1;
    this.edited_field={id:0,label:'',icon:'',action_key:''}
    this.field_edit_display=true;
  }

  editButton(field:any,row:number)
  {
    this.edited_row=row;
    this.edited_field={...field};
    this.field_edit_display=true;
  }

  deleteButton(field:any,row:number)
  {
    this.fullPage.fields.splice(row,1);
    this.fullPage.fields=[...this.fullPage.fields];
  }

  moveup(row:number,field:any)
  {
    if (row==0){return;}
    this.fullPage.fields.splice(row,1);
    this.fullPage.fields.splice(row-1,0,field);
    this.setRows();
    this.fullPage.fields=[...this.fullPage.fields];
  }

  saveField()
  {
      if (this.edited_row==-1)
      {
        this.fullPage.buttons.push({...this.edited_field});
      }else
      {
        this.fullPage.buttons[this.edited_row]={...this.edited_field};
      }
      this.edited_field=null;
      this.field_edit_display=false;
      this.fullPage.fields=[...this.fullPage.fields];
  }

  setRows()
  {
    var idx=0;
    for(var item of this.fullPage.fields)
    {
        item.sort_order=idx;
        idx++;
    }
    console.log(this.fullPage.fields);
  }

  movedown(row:number,field:any)
  {
    if (row==this.fullPage.fields.length-1){return;}
    this.fullPage.fields.splice(row,1);
    this.fullPage.fields.splice(row+1,0,field);
    this.setRows();
    this.fullPage.fields=[...this.fullPage.fields];
  }
}
