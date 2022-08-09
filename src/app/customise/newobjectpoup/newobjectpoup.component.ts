import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-newobjectpoup',
  templateUrl: './newobjectpoup.component.html',
  styleUrls: ['./newobjectpoup.component.scss']
})
export class NewobjectpoupComponent implements OnInit {

public objectType:string="";
public fullObject:any;
public listlist:any[]=[];
public buttonlist:any[]=[];
public fieldlist:any[]=[];
public lookuplist:any[]=[];
public columnlist:any[]=[];
public actionlist:any[]=[];

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.objectType=this.config.data.type;
    this.fullObject=this.config.data.fullPage;
    this.listlist=this.config.data.lists;
    this.actionlist=this.config.data.actions;
    this.buttonlist=this.config.data.buttons;
    this.fieldlist=this.config.data.fields;
    this.lookuplist=this.config.data.lookups;
    this.columnlist=this.config.data.columns;
  }


  refresh(event:any)
  {
      this.ref.close();
  }
}
