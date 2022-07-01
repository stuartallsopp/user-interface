import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-outline',
  templateUrl: './column-outline.component.html',
  styleUrls: ['./column-outline.component.scss']
})
export class ColumnOutlineComponent implements OnInit {

  @Input() fullPage:any;

  constructor() { }

  ngOnInit(): void {
  }

}
