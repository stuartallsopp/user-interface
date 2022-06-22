import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() definition:any;
  @Input() data:any;
  @Input() cacheid:string="";
  @Input() source_type:string="";
  
  constructor() { }

  ngOnInit(): void {
  }

}
