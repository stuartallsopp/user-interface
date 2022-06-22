import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-date',
  templateUrl: './list-col-date.component.html',
  styleUrls: ['./list-col-date.component.scss']
})
export class ListColDateComponent implements OnInit {

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
