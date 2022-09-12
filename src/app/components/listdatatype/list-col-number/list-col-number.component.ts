import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-col-number',
  templateUrl: './list-col-number.component.html',
  styleUrls: ['./list-col-number.component.scss']
})
export class ListColNumberComponent implements OnInit,OnChanges {

  @Input() data:any;
  @Input() definition:any;
  @Output() buttonclicked:EventEmitter<any>=new EventEmitter<any>();
  public configs:any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      if (this.definition.context_param!=undefined&&this.definition.context_param!=null)
      {
        this.configs=JSON.parse(this.definition.context_param);
      }
    }
  }

  isLink():boolean
  {
    if (this.definition.type=='num_link'){
      if (this.data?.calc==undefined||this.data?.calc==false){return true;}
      return false;
    }
    return false;
  }

  ngOnInit(): void {
  }

  onClick()
  {
    this.buttonclicked.emit({field:this.definition.field,data:this.data,config:this.configs?.button});
  }

  public format():string
  {
    return this.definition.format;
  }

}
