import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-col-text',
  templateUrl: './list-col-text.component.html',
  styleUrls: ['./list-col-text.component.scss']
})
export class ListColTextComponent implements OnInit,OnChanges {

  @Input() data:any;
  @Input() definition:any;

  public configs:any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      this.checkparameters();
    }
  }

  ngOnInit(): void {
  }

  checkparameters()
  {
    if (this.definition.context_param!=undefined&&this.definition.context_param!=null)
    {
      this.configs=JSON.parse(this.definition.context_param);
    }
  }

  validatefield()
  {
    if (!this.data){ return this.definition.field;}
    if (this.configs?.choose==undefined||this.configs?.choose==null)
    {
      return this.definition.field;
    }
    var val=this.data[this.configs.choose.field];
    var check=this.configs.choose.options.filter(p=>p.value==val)[0];
    if (check==null){return this.definition.field;}
    return check.field;
  }

}
