import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-action-outline',
  templateUrl: './action-outline.component.html',
  styleUrls: ['./action-outline.component.scss']
})
export class ActionOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  public action_edit_display:boolean=false;
  public edited_action:any=null;
  public edited_row:number=0;
  

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }


  updateEdit()
  {
      this.dataService.update_action(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }

  addAction()
  {
    this.edited_row=-1;
    this.edited_action={id:0,label:'',icon:'',action_key:''}
    this.action_edit_display=true;
  }

  editAction(action:any,row:number)
  {
    this.edited_row=row;
    this.edited_action={...action};
    this.action_edit_display=true;
  }

  deleteAction(action:any,row:number)
  {
    this.fullPage.actions.splice(row,1);
    this.fullPage.actions=[...this.fullPage.actions];
  }

  saveAction()
  {
      if (this.edited_row==-1)
      {
        this.fullPage.actions.push({...this.edited_action});
      }else
      {
        this.fullPage.actions[this.edited_row]={...this.edited_action};
      }
      this.edited_action=null;
      this.action_edit_display=false;
      this.fullPage.actions=[...this.fullPage.actions];
  }

  
}
