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
  @Input() source_type:string='';
  @Input() parentdata:any=null;
  @Output() register:EventEmitter<any>=new EventEmitter<any>();
  @Output() visibility_check:EventEmitter<any>=new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  raise_value_changed(event:any)
  {
    this.value_changed.emit(event);
  }

  raise_register(event)
  {
    this.register.emit(event);
  }

  raise_visibility_check(event)
  {
    this.visibility_check.emit(event);
  }

}
