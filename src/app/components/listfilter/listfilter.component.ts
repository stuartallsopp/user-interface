import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listfilter',
  templateUrl: './listfilter.component.html',
  styleUrls: ['./listfilter.component.scss']
})
export class ListfilterComponent implements OnInit {

  @Input() filters:any[]=[];
  @Output() filter_changed:EventEmitter<any[]>=new EventEmitter<any[]>();
  constructor() { }

  ngOnInit(): void {
    this.raiseevent();
  }

  filter_value_changed(filter:any)
  {
    if (filter.type=='picklist' && filter.default_value?.length==0)
    {
      filter.default_value=null;
    }
    this.raiseevent();
  }
  raiseevent()
  {
    this.filter_changed.emit(this.resolveFilters());
  }

  resolveFilters():any
  {
    var result:any[]=[];
    for(var filter of this.filters)
    {

      result.push({type:filter.filter_type,column:filter.map_to,value:filter.default_value});
    }
    return result;
  }

}
