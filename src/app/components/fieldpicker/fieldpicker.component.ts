import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fieldpicker',
  templateUrl: './fieldpicker.component.html',
  styleUrls: ['./fieldpicker.component.scss']
})
export class FieldpickerComponent implements OnInit {

  @Output() value_changed:EventEmitter<any>=new EventEmitter<any>();
  @Input() data:any=null;
  @Input() field:any=null;

  constructor() { }

  ngOnInit(): void {
  }

  raise_value_changed(event:any)
  {
    this.value_changed.emit(event);
  }

}
