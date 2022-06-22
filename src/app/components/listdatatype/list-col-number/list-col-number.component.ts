import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-number',
  templateUrl: './list-col-number.component.html',
  styleUrls: ['./list-col-number.component.scss']
})
export class ListColNumberComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;
  constructor() { }

  ngOnInit(): void {
  }

  public format():string
  {
    return this.definition.format;
  }

}
