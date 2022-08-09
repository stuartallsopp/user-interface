import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { AnalysisPanelComponent } from 'src/app/components/analysis-panel/analysis-panel.component';


@Component({
  selector: 'app-actionpanel',
  templateUrl: './actionpanel.component.html',
  styleUrls: ['./actionpanel.component.scss']
})
export class ActionpanelComponent implements OnInit,OnChanges,OnDestroy {


  private ihavebuttonsreceiver:any;
  public showanalysis:boolean=false;
  @Input() definition:any;
  @Output() useractioned:EventEmitter<any>=new EventEmitter<any>();
  @ViewChild(AnalysisPanelComponent) analysispanel;

  constructor(private eventb:NgEventBus) { }
  ngOnDestroy(): void {
    if (this.ihavebuttonsreceiver!=null)
    {
      this.ihavebuttonsreceiver.unsubscribe();
    }
    this.ihavebuttonsreceiver=null;
  }

  public listbuttons:any[]=[];

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['definition'])
      {
          this.listbuttons=[];
          this.eventsubscription();
      }
  }

  ngOnInit(): void {

  }

  buttonpressed(event:any)
  {
    this.useractioned.emit(event);
  }

  listbuttonpressed(event:any)
  {
    this.eventb.cast(event.from,{type:'listbuttonclick',button:event.button});
  }

  datachanged(event)
  {
    if (event.value==null){
      this.showanalysis=false;
    }else
    {
      this.showanalysis=true;
      this.analysispanel.sourcechanged(event);
    }
  }

  eventsubscription()
  {
    this.ihavebuttonsreceiver=this.eventb.on('actionpanel').subscribe({next:(result:any)=>{
      if (this.listbuttons&&result.data?.buttonset)
      {
        var check=this.listbuttons.filter(p=>p.buttonset.id==result.data.buttonset.id)[0];
        if (check==null)
        {
          if (result.data.buttonset.buttons.filter((p: { location: string; })=>p.location=='top'||p.location=='both').length>0)
          {
            this.listbuttons.push(result.data);
          }
        }
      }
    }})
  }


}
