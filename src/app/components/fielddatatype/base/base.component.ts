import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { AutoComplete } from 'primeng/autocomplete';
import { InputText } from 'primeng/inputtext';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit,OnChanges,OnDestroy,AfterViewInit {

  @Input() data:any={};
  @Input() definition:any;
  @Input() source_type:string="";
  @Output() value_changed:EventEmitter<any>=new EventEmitter<any>();
  @Output() register:EventEmitter<any>=new EventEmitter<any>();
  @Output() visibility_check:EventEmitter<any>=new EventEmitter();

  @ViewChildren(HTMLInputElement) entryfield:QueryList<HTMLInputElement>;
  @ViewChildren(AutoComplete) autocomplete:QueryList<AutoComplete>;

  public registered_subscriptions:any[]=[];

  public field_configs:any=null;

  public local_data_source:any={value:null,resolved:null}
  public loader_key:string="";
  public unique_id:string=uuidv4();

  private local_event_subscriber:any;
  private local_subscription_subscriber:any;
 

  constructor(public dataService:DataService,public event:NgEventBus) { }
  ngOnDestroy(): void {
    if (this.local_event_subscriber!=null){this.local_event_subscriber.unsubscribe();}
    if (this.local_subscription_subscriber!=null){this.local_subscription_subscriber.unsubscribe();}
    this.local_event_subscriber=null;
    this.local_subscription_subscriber=null;
  }
  ngOnChanges(changes: SimpleChanges): void {
     if (changes['data'])
     {

     }
     if (changes['definition'])
     {
      this.resolveFieldConfigs();
      this.notifySubscriptions();
     }
  }

  is_Visible(event)
  {
    if (event==true&&this.entryfield?.first!=undefined)
    {
      if (this.entryfield.first.disabled!=true)
      {
        this.visibility_check.emit({id:this.unique_id,elements:this.entryfield});
      }
    }
  }

  ngAfterViewInit(): void {
    this.definition.unique_id=this.unique_id;
    this.register.emit({id:this.unique_id,elements:this.entryfield,definition:this.definition});
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

  resolveFieldConfigs()
  {
    if (this.definition.context_param!=undefined&&this.definition.context_param!=null)
    {
      this.field_configs=JSON.parse(this.definition.context_param);
    }
  }

  notifySubscriptions()
  {
    if (this.definition.subscription!=undefined&&this.definition.subscription!=null)
    {
      this.event.cast('subscription',{id:this.unique_id,reference:this.definition.subscription});
    }
  }

  isVisible():boolean
  {
    if (this.field_configs==null||this.field_configs==undefined){return true;}
    if (this.field_configs.visible==undefined||this.field_configs.visible==null){return true;}
    if (this.data[this.field_configs.visible]==undefined){return true;}
    return this.data[this.field_configs.visible];
  }

  fieldLabel():string
  {
    if (this.field_configs==null){return this.definition.label;}
    if (this.field_configs.label==undefined||this.field_configs.label==null){return this.definition.label;}
    return this.data[this.field_configs.label];
  }

  checkSourceType():string
  {
    if (this.field_configs==null){return this.source_type}
    if (this.field_configs.source_type==undefined||this.field_configs.source_type==null){return this.source_type;}
    return this.data[this.field_configs.source_type];
  }

  ngOnInit(): void {
    this.loader_key="loader_"+this.unique_id;
    this.local_event_subscription();
  }

  local_event_subscription()
  {
    this.local_event_subscriber=this.event.on(this.unique_id).subscribe((result=>{
      if (result.data.action=='value_publish')
      {
        console.log(result.data);
        this.setValue(result.data.data);
      }else
      {
        this.redraw(result.data.data);
      }

    }));
    this.local_subscription_subscriber=this.event.on('subscription').subscribe(result=>{
        if (result.data.id!=this.unique_id)
        {
          var check=this.registered_subscriptions.filter(p=>p.id==result.data.id)[0];
          if (check==null)
          {
            this.registered_subscriptions.push(result.data);
            this.setsubscribers();
          }
        }
    })
  }

  setValue(value:any)
  {
    console.log(this.local_data_source,this.data);
    if (this.definition.fieldname!='.')
    {
      this.data[this.definition.fieldname]=value;
    }else
    {
      this.local_data_source=value;
    }
  }

  setsubscribers()
  {

  }

  redraw(data:any)
  {

  }

}
