import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit,OnChanges {

  @Input() definition:any;
  @Input() data:any;
  @Input() cacheid:string="";
  @Input() source_type:string="";
  @Input() dialog:boolean=false;

  public local_data:any;
  
  constructor(public responsive:ResponsiveService,private dataService:DataService) { }
  ngOnChanges(changes: SimpleChanges): void {


    if (changes['definition']||changes['data'])
    {
        this.setData();
    }
  }

  setData()
  {
    if (this.data==undefined){return;}
    if (this.definition.data_field)
    {
      this.local_data=this.data[this.definition.data_field];
    }else
    {
      this.local_data=this.data;
    }
  }


  field_changed(event:any)
  {
    console.log(event);
    if (this.definition.data_field)
    {
      this.data[this.definition.data_field]=event;
      this.local_data=this.data[this.definition.data_field];

      if (this.local_data==null){this.setData();}
    }
  }

  ngOnInit(): void {
  }

}
