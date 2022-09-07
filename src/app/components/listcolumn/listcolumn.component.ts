import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listcolumn',
  templateUrl: './listcolumn.component.html',
  styleUrls: ['./listcolumn.component.scss']
})
export class ListcolumnComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;
  @Output() buttonclick:EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick($event)
  {
    this.buttonclick.emit($event);
  }

}
