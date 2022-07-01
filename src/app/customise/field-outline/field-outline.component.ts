import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-outline',
  templateUrl: './field-outline.component.html',
  styleUrls: ['./field-outline.component.scss']
})
export class FieldOutlineComponent implements OnInit {

  @Input() fullPage:any;

  constructor() { }

  ngOnInit(): void {
  }

}
