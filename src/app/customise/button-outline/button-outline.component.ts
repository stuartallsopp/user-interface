import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-button-outline',
  templateUrl: './button-outline.component.html',
  styleUrls: ['./button-outline.component.scss']
})
export class ButtonOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  public button_edit_display:boolean=false;
  public edited_button:any=null;
  public edited_row:number=0;
  

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }

  updateEdit()
  {
      this.dataService.update_button(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }

  addButton()
  {
    this.edited_row=-1;
    this.edited_button={id:0,label:'',icon:'',action_key:''}
    this.button_edit_display=true;
  }

  editButton(button:any,row:number)
  {
    this.edited_row=row;
    this.edited_button={...button};
    this.button_edit_display=true;
  }

  deleteButton(button:any,row:number)
  {
    this.fullPage.buttons.splice(row,1);
    this.fullPage.buttons=[...this.fullPage.buttons];
  }

  saveButton()
  {
      if (this.edited_row==-1)
      {
        this.fullPage.buttons.push({...this.edited_button});
      }else
      {
        this.fullPage.buttons[this.edited_row]={...this.edited_button};
      }
      this.edited_button=null;
      this.button_edit_display=false;
      this.fullPage.buttons=[...this.fullPage.buttons];
  }

  moveup(row:number,button:any)
  {
    if (row==0){return;}
    this.fullPage.buttons.splice(row,1);
    this.fullPage.buttons.splice(row-1,0,button);
    this.setRows();
    this.fullPage.buttons=[...this.fullPage.buttons];
  }

  setRows()
  {
    var idx=0;
    for(var item of this.fullPage.buttons)
    {
        item.sort_order=idx;
        idx++;
    }
    console.log(this.fullPage.buttons);
  }

  movedown(row:number,button:any)
  {
    if (row==this.fullPage.buttons.length-1){return;}
    this.fullPage.buttons.splice(row,1);
    this.fullPage.buttons.splice(row+1,0,button);
    this.setRows();
    this.fullPage.buttons=[...this.fullPage.buttons];
  }

  colour(input:string)
  {
    return 'p-button-'+input;
  }

  cancelEdit()
  {
    
  }
}
