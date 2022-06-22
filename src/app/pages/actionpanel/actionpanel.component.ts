import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-actionpanel',
  templateUrl: './actionpanel.component.html',
  styleUrls: ['./actionpanel.component.scss']
})
export class ActionpanelComponent implements OnInit {


  @Input() definition:any;
  @Output() useractioned:EventEmitter<any>=new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonpressed(event:any)
  {
    this.useractioned.emit(event);
  }

}
