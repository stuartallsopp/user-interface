import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actioncustom-outline',
  templateUrl: './actioncustom-outline.component.html',
  styleUrls: ['./actioncustom-outline.component.scss']
})
export class ActioncustomOutlineComponent implements OnInit {

  @Input() items:any[]=[];
  @Output() itemsChange = new EventEmitter<any[]>();

  public custom_edit_display:boolean=false;
  public edited_custom:any=null;
  public edited_row:number=0;

  constructor() { }





  ngOnInit(): void {
  }

  addCustom()
  {
    this.edited_row=-1;
    this.edited_custom={id:0,type:'',value:'',key:''}
    this.custom_edit_display=true;
  }

  editCustom(custom:any,row:number)
  {
    this.edited_row=row;
    this.edited_custom={...custom};
    this.custom_edit_display=true;
  }

  deleteCustom(custom:any,row:number)
  {
    this.items.splice(row,1);
    this.items=[...this.items];
    this.itemsChange.emit(this.items); 
  }

  saveCustom()
  {
      if (this.edited_row==-1)
      {
        this.items.push({...this.edited_custom});
      }else
      {
        this.items[this.edited_row]={...this.edited_custom};
      }
      this.edited_custom=null;
      this.custom_edit_display=false;
      this.items=[...this.items];
      this.itemsChange.emit(this.items); 
  }
}
