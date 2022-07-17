import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-mdl',
  templateUrl: './list-col-mdl.component.html',
  styleUrls: ['./list-col-mdl.component.scss']
})
export class ListColMdlComponent implements OnInit {

  @Input() data:any;
  @Input() definition:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
