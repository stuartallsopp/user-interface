import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit,OnChanges,OnDestroy {

  @Input() data:any={};
  @Input() definition:any;
  @Output() value_changed:EventEmitter<any>=new EventEmitter<any>();
  

  public local_data_source:any={value:null,resolved:null}
  public loader_key:string="";
  public unique_id:string=uuidv4();

  private local_event_subscriber:any;

  constructor(public dataService:DataService,public event:NgEventBus) { }
  ngOnDestroy(): void {
    if (this.local_event_subscriber!=null){this.local_event_subscriber.unsubscribe();}
    this.local_event_subscriber=null;
  }
  ngOnChanges(changes: SimpleChanges): void {
     if (changes['data'])
     {

     }
  }

  raise_value_changed(event:any){
      this.value_changed.emit(event);
  }

  checkKeyFilter(filter:string):any
  {
    const available:string[]=['int','pint','pnum','num','hex','email','alpha','alphanum'];
    if (filter==undefined||filter==null||filter==""){return null}
    if (available.filter(p=>p==filter)[0])
    {
      return filter;
    }
    return new RegExp(filter);
  }

  disableOn(value:string):boolean
  {
    if (value!=undefined&&value!=null)
    {
      var split=value.split(",");
      for(var item of split)
      {
        if (item=="E"&&this.data.id!=0){return true;}
        if (item=="I"&&this.data.id==0){return true;}
        if (this.data[item]!=undefined){return this.data[item];}
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.local_event_subscription();
  }

  local_event_subscription()
  {
    this.local_event_subscriber=this.event.on(this.unique_id).subscribe((result=>{
      this.redraw(result.data.data);
    }))
  }

  redraw(data:any)
  {

  }

}
