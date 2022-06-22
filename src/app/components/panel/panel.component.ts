import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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

  public local_data:any;
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition']||changes['data'])
    {
      if (this.definition.data_field)
      {
        this.local_data=this.data[this.definition.data_field];
      }else
      {
        this.local_data=this.data;
      }
    }
  }

  ngOnInit(): void {
  }

}
