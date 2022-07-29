import { Component, Input, OnInit } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-form-outline',
  templateUrl: './form-outline.component.html',
  styleUrls: ['./form-outline.component.scss']
})
export class FormOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Input() buttonlist:any[]=[];
  @Input() actionlist:any[]=[];
  @Input() fieldlist:any[]=[];
  @Input() listlist:any[]=[];
  @Input() lookuplist:any[]=[];




  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }


  updateEdit()
  {
      this.dataService.update_form(this.fullPage).subscribe({next:(result)=>{
      }})
  }

  cancelEdit()
  {
    
  }


 
}
