import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-tag',
  templateUrl: './list-col-tag.component.html',
  styleUrls: ['./list-col-tag.component.scss']
})
export class ListColTagComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;

  constructor() { }

  ngOnInit(): void {
  }

  resolveIcon():string
  {
    if (this.definition.context_param!=undefined&&this.definition.context_param!=null&&this.definition.context_param!="")
    {
      return this.definition.context_param;
    }
    return "fa-solid fa-note";
  }

  resolveShow():boolean
  {
    if (this.data[this.definition.field]!=undefined&&
      this.data[this.definition.field]!=null&&
      this.data[this.definition.field]>0)
      {
        return true;
      }


    return false;
  }

}
