import { Component, OnInit } from '@angular/core';
import { runInThisContext } from 'vm';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
    this.getPages();
    this.getButtons();
    this.getColumns();
    this.getFields();
    this.getLookups();
  }

  public objectType:string="form";
  public selectedObject:any;
  public pages:any[]=[];
  public fields:any[]=[];
  public columns:any[]=[];
  public buttons:any[]=[];
  public lookups:any[]=[];
  public fullObject:any;


  tabChanged(event:any)
{
  switch(event.index)
  {
    case 0:
      this.objectType="form";
      this.getPages();
      break;
    case 1:
      this.objectType="column";
      this.getColumns();
      break;
    case 2:
      this.objectType="field";
      this.getFields();
      break;
    case 3:
      this.objectType="button";
      this.getButtons();
      break;
    case 4:
      this.objectType="lookup";
      this.getLookups();
      break;

  }
  this.selectedObject=null;
  this.fullObject=null;
}

  rowSelected(type:string)
  {
    switch(type)
    {
      case 'form':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_page_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break;
      case 'button':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_button_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break; 
      case 'column':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_column_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break; 
      case 'field':
        if (this.selectedObject==null){this.fullObject=null;}else{
          this.dataService.get_field_by_id(this.selectedObject.id).subscribe({next:(result)=>{
            this.fullObject=result;
          }})
        }
        break; 
      case 'lookup':
          if (this.selectedObject==null){this.fullObject=null;}else{
            this.dataService.get_lookup_by_id(this.selectedObject.id).subscribe({next:(result)=>{
              this.fullObject=result;
            }})
          }
          break; 
    }

  }

  refresh(source:any)
  {
      if (this.objectType=="form")
      {
        this.tabChanged({index:0});
      }
      if (this.objectType=="column")
      {
        this.tabChanged({index:1});
      }
      if (this.objectType=="field")
      {
        this.tabChanged({index:2});
      }
      if (this.objectType=="button")
      {
        this.tabChanged({index:3});
      }
      if (this.objectType=="lookup")
      {
        this.tabChanged({index:4});
      }
  }

  delete(type:string,item:any)
  {
      
  }

  getPages()
  {
    this.dataService.get_page().subscribe({next:(result:any)=>{
      this.pages=[...result];
    }})
  }

  getButtons()
  {
    this.dataService.get_button().subscribe({next:(result:any)=>{
      this.buttons=[...result];
    }})
  }

  getColumns()
  {
    this.dataService.get_column().subscribe({next:(result:any)=>{
      this.columns=[...result];
    }})
  }

  getFields()
  {
    this.dataService.get_field().subscribe({next:(result:any)=>{
      this.fields=[...result];
    }})
  }

  getLookups()
  {
    this.dataService.get_lookup().subscribe({next:(result:any)=>{
      this.lookups=[...result];
    }})
  }
}
