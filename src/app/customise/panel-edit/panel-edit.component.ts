import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-panel-edit',
  templateUrl: './panel-edit.component.html',
  styleUrls: ['./panel-edit.component.scss']
})
export class PanelEditComponent implements OnInit,OnChanges {


  @Input() panel:any;
  @Output() panelChange=new EventEmitter<any>();
  @Output() savePanel=new EventEmitter<any>();
  @Input() fieldlist:any[]=[];
  @Input() lookuplist:any[]=[];
  @Input() listlist:any[]=[];
  
  public has_field:boolean=false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['panel'])
    {
      this.has_field=(this.panel.field!=undefined&&this.panel.field!=null);
    }
  }

  includeexcludefield()
  {
    if (this.has_field==false){this.panel.field=null;this.panel.data_field_id=0; return;}
    if (this.has_field==true){
      if (this.panel.field==undefined||this.panel.field==null){
        this.panel.field={id:0,label:'',icon:'',action_key:'',type:'tex_entry',compulsory:false};
      }
    }
  }

  ngOnInit(): void {
  }

  

}
