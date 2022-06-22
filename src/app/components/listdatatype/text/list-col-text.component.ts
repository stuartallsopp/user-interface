import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-text',
  templateUrl: './list-col-text.component.html',
  styleUrls: ['./list-col-text.component.scss']
})
export class ListColTextComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;
  constructor() { }

  ngOnInit(): void {
  }

}
