import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-col-number',
  templateUrl: './list-col-number.component.html',
  styleUrls: ['./list-col-number.component.scss']
})
export class ListColNumberComponent implements OnInit,OnChanges {

  @Input() data:any;
  @Input() definition:any;
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

  ngOnInit(): void {
  }

  public format():string
  {
    return this.definition.format;
  }

}
