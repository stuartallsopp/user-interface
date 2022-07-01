import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-outline',
  templateUrl: './form-outline.component.html',
  styleUrls: ['./form-outline.component.scss']
})
export class FormOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Input() buttonlist:any[]=[];
  constructor() { }

  ngOnInit(): void {
  }


  updateEdit()
  {

  }

  cancelEdit()
  {
    
  }

}
