import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-noteview',
  templateUrl: './noteview.component.html',
  styleUrls: ['./noteview.component.scss']
})
export class NoteviewComponent implements OnInit,OnDestroy {

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private event: NgEventBus
  ) { }
  ngOnDestroy(): void {
    if (this.eventsubscription!=null){
      this.eventsubscription.unsubscribe();
    }
    this.eventsubscription=null;
  }

  private eventsubscription:any;
  private requires_refresh:boolean=false;

  public code:string="";
  public data:any;
  public id:number=0;
  private from:string='';
  public description:string="";
  public type:string="";
  ngOnInit(): void {
    this.id=this.config.data.propertybag.id;
    this.code=this.config.data.propertybag.code;
    this.from=this.config.data.propertybag.from_id;
    this.type=this.config.data.propertybag.type;
    this.description=this.config.data.propertybag.description;
    this.data={id:this.id,action_uri:{type:this.type}};
    this.subscribe();
  }

  setrefresh()
  {
    this.requires_refresh=true;
  }

  subscribe()
  {
    this.ref.onClose.subscribe({next:(result)=>{
      if (this.requires_refresh==true)
      {
        this.event.cast(this.from,{type:'redraw'});
      }
    }})
  }

}
