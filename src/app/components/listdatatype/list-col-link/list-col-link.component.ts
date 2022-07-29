import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-col-link',
  templateUrl: './list-col-link.component.html',
  styleUrls: ['./list-col-link.component.scss']
})
export class ListColLinkComponent implements OnInit {


  @Input() data:any;
  @Input() definition:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
