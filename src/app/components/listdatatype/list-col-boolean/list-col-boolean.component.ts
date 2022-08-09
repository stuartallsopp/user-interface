import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-boolean',
  templateUrl: './list-col-boolean.component.html',
  styleUrls: ['./list-col-boolean.component.scss']
})
export class ListColBooleanComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;

  constructor() { }

  ngOnInit(): void {
  }

}
