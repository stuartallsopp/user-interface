import { Component, OnInit } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }

  public pages:any[]=[];


  getPages()
  {
    this.dataService.get_page().subscribe({next:(result:any)=>{
      this.pages=result;
    }})
  }
}
