import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit,OnChanges {

  @Input() definition:any;
  @Input() data:any;
  @Input() dialog:boolean=false;
  @Input() source_type:string='';
  @Input() panel_index:number;
  @Input() panel_from:string;

  private panelFields:any[]=[];

  private lowest_index:number=9999;
  public columns:any[]=[];

  constructor(public responsive:ResponsiveService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.resolveColumns();
    }
  }

  register_field(event)
  {
    this.panelFields.push(event);
  }

  check_visibility(event)
  {
    if (this.panel_from=="page" && this.panel_index!=0){return;}
    var check=this.panelFields.filter(p=>p.id==event.id)[0];
    if (check!=null)
    {
      var idx=this.panelFields.indexOf(check);
      if (idx<=this.lowest_index)
      {
        this.lowest_index=idx;
        event.elements.first.focus();
      }
    }
  }

  ngOnInit(): void {
  }

  resolveColumns()
  {
    this.columns=[];
    if (this.definition.fields_resolved!=null&&this.definition.fields_resolved?.length>0)
    {
      this.columns.push({id:1,width:12,fields:this.definition.fields_resolved});
    }else
    {
      var idx=0;
      for(var col of this.definition.columns)
      {
        this.columns.push({id:col.column_no,width:this.resolveColumnWidth(idx),fields:col.fields});
        idx++;
      }
    }
  }

  checkVisible(field:any)
  {
    if (this.data==undefined||this.data==null){return true;}
    if (field.context_param==undefined||field.context_param==null){return true;}
    var local=JSON.parse(field.context_param);
    if (local?.visible==undefined||local?.visible==null){return true;}
    if (this.data[local.visible.field]==undefined){return true;}

    var check=local.visible.options.filter(p=>p.value===this.data[local.visible.field])[0];

    if (check==null){return true;}

    return check.result;
  }

  resolveColumnWidth(idx:number)
  {
    if (this.definition.column_count==undefined||this.definition.column_count==null){return 12;}
    if (this.definition.first_col!=undefined&&this.definition.first_col!=null&&this.definition.first_col!=0)
    {
      if (idx==0){return this.definition.first_col;}else{return 12-this.definition.first_col;}
    }
    switch(this.definition.column_count)
    {
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 3;
      default:
        return 12;
    }
  }

}
