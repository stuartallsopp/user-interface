import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-col-combo',
  templateUrl: './list-col-combo.component.html',
  styleUrls: ['./list-col-combo.component.scss']
})
export class ListColComboComponent implements OnInit,OnChanges {


  @Input() data:any;
  @Input() definition:any;

  public config:any;
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.config=JSON.parse(this.definition.context_param);
    }
  }

  resolveColour()
  {
    if (this.config.colour!=undefined){return this.config.colour;}
    if (this.config.colour_field!=undefined){return this.data[this.config.colour_field];}
    return null;
  }

  resolveIcon()
  {
    if (this.config.icon!=undefined){return this.config.icon;}
    if (this.config.icon_field!=undefined){return this.data[this.config.icon_field];}
    return null;
  }

  ngOnInit(): void {
  }

}
