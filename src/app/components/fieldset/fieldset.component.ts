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

  public columns:any[]=[];

  constructor(public responsive:ResponsiveService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.resolveColumns();
    }
  }

  ngOnInit(): void {
  }

  resolveColumns()
  {
    console.log(this.definition);
    this.columns=[];
    if (this.definition.fields_resolved!=null&&this.definition.fields_resolved?.length>0)
    {
      this.columns.push({id:1,width:12,fields:this.definition.fields_resolved});
    }else
    {
      var width=this.resolveColumnWidth();
      for(var col of this.definition.columns)
      {
        this.columns.push({id:col.column_no,width:width,fields:col.fields});
      }
    }
    console.log(this.columns);
  }

  resolveColumnWidth()
  {
    if (this.definition.column_count==undefined||this.definition.column_count==null){return 12;}
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
