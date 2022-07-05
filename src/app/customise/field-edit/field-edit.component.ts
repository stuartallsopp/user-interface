import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent implements OnInit {


  @Input() lookuplist:any[]=[];
  @Input() actionlist:any[]=[];
  @Input() field:any;
  @Output() fieldChange= new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
