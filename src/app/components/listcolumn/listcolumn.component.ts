import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listcolumn',
  templateUrl: './listcolumn.component.html',
  styleUrls: ['./listcolumn.component.scss']
})
export class ListcolumnComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;
  constructor() { }

  ngOnInit(): void {
  }

}
