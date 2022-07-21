import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-outline',
  templateUrl: './panel-outline.component.html',
  styleUrls: ['./panel-outline.component.scss']
})
export class PanelOutlineComponent implements OnInit {


  @Input() panels:any[]=[];
  @Output() panelsChange=new EventEmitter<any[]>();

  @Input() fieldlist:any[]=[];
  @Input() listlist:any[]=[];
  @Input() actionlist:any[]=[];
  @Input() lookuplist:any[]=[];

  public panel_edit_display:boolean=false;
  public edited_panel:any=null;
  public edited_row:number=0;


  constructor() { }





  ngOnInit(): void {
  }

  addPanel()
  {
    this.edited_row=-1;
    this.edited_panel={id:0,description:'',has_border:false}
    this.panel_edit_display=true;
  }

  editPanel(panel:any,row:number)
  {
    this.edited_row=row;
    this.edited_panel={...panel};
    this.panel_edit_display=true;
  }

  deletePanel(panel:any,row:number)
  {
    this.panels.splice(row,1);
    this.panels=[...this.panels];
    this.panelsChange.emit(this.panels);
  }

  savePanel(event:any)
  {
    this.edited_panel=event;
      if (this.edited_row==-1)
      {
        this.panels.push({...this.edited_panel});
      }else
      {
        this.panels[this.edited_row]={...this.edited_panel};
      }
      this.edited_panel=null;
      this.panel_edit_display=false;
      this.panels=[...this.panels];
      this.panelsChange.emit(this.panels);
  }

  moveup(row:number,panel:any)
  {
    if (row==0){return;}
    this.panels.splice(row,1);
    this.panels.splice(row-1,0,panel);
    this.setRows();
    this.panels=[...this.panels];
    this.panelsChange.emit(this.panels);
  }

  setRows()
  {
    var idx=0;
    for(var item of this.panels)
    {
        item.sort_order=idx;
        idx++;
    }
    console.log(this.panels);
  }

  movedown(row:number,panel:any)
  {
    if (row==this.panels.length-1){return;}
    this.panels.splice(row,1);
    this.panels.splice(row+1,0,panel);
    this.setRows();
    this.panels=[...this.panels];
    this.panelsChange.emit(this.panels);
  }
}
