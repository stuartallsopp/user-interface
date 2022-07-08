import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-noteview',
  templateUrl: './noteview.component.html',
  styleUrls: ['./noteview.component.scss']
})
export class NoteviewComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
  ) { }


  public code:string="";
  public data:any;
  public id:number=0;
  public description:string="";
  public type:string="";
  ngOnInit(): void {
    this.id=this.config.data.propertybag.id;
    this.code=this.config.data.propertybag.code;
    this.type=this.config.data.propertybag.type;
    this.description=this.config.data.propertybag.description;
    this.data={id:this.id,action_uri:{type:this.type}};
  }

}
