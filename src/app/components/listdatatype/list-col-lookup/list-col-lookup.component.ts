import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-col-lookup',
  templateUrl: './list-col-lookup.component.html',
  styleUrls: ['./list-col-lookup.component.scss']
})
export class ListColLookupComponent implements OnInit,OnChanges {

  @Input() data:any;
  @Input() definition:any;

  private content:any[]=[];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition'])
    {
      if (this.definition.lookup?.content)
      {
        this.content=JSON.parse(this.definition.lookup.content);
      }
    }
  }

  ngOnInit(): void {
  }

  resolvelookup(value:any)
  {
      var check=this.content.filter(p=>p.c==value)[0];
      if (check!=null){return check['n']}
      return value;
  }
}
