import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-posting-dialog',
  templateUrl: './posting-dialog.component.html',
  styleUrls: ['./posting-dialog.component.scss']
})
export class PostingDialogComponent implements OnInit,OnChanges {


  @Input() workinglist:any[];
  @Input() active:boolean=false;
  @Input() action:any;
  @Input() list_id:string;


  @Output() complete:EventEmitter<any>=new EventEmitter<any>();

  public show_dialog:boolean=false;
  public source_type:string;
  private post_url:string;
  public pagebuttons:any={buttons:[
    {action_key:'post_record',colour:'success',label:'Post',icon:'fa-solid fa-floppy-disk',location:'dialog',sort_order:0}
    ,{action_key:'cancel_dialog',colour:'secondary',label:'Cancel',icon:'fa-solid fa-xmark',location:'dialog',sort_order:1}
  ]};
  public period_definition={
    fieldname:'post_date,period',
    label:'Period',
    width:12,
    data_url:'list/system/openperiods/{source_type}',
    data_url_param:'{"search":"period_index","order":"period_index"}',
    aut_config:'{"label":"description","id":"id"}'
  };
  public screendata:any[]=[];

  constructor(private dataService:DataService,private mess:MessageService,private event:NgEventBus) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['active'])
    {
      if (this.active==true)
      {
        this.posting();
      }
    }
  }

  close_window()
  {
    this.show_dialog=false;
    this.complete.emit(true);
  }

  ngOnInit(): void {
  }


  post()
  {
    var url=this.post_url;
    url=url.replace('{source_type}',this.source_type);

      if (this.workinglist.length==0)
      {
        this.mess.add({severity:'error',detail:'Nothing has been selected to post',summary:'Processing Error',key:'standard'});
        return;
      }
      var id_list:number[]=[];
      for(var item of this.workinglist)
      {
        id_list.push(item.id);
      }
      this.event.cast("top",{action:'open_progress'});
      this.dataService.post(url,{ids:id_list,actions:this.screendata}).subscribe({next:(result)=>{
          this.event.cast('top',{action:'close_progress'});
          console.log(this.list_id);
          this.event.cast(this.list_id,{type:'redraw'});
          this.close_window();
      },
      error:(error)=>{
        this.mess.add({severity:'error',key:'standard',detail:error.message,summary:'Posting Error'});
        this.event.cast('top',{action:'close_progress'});
        this.close_window();
      }});
  }

  posting()
  {
      this.post_url=this.action.url;
      this.source_type=this.action.source_type;
      var check_url='transaction/{source_type}/postcheck';
      if (this.workinglist.length==0)
      {
        this.mess.add({severity:'error',detail:'Nothing has been selected to post',summary:'Processing Error',key:'standard'});
        return;
      }
      var id_list:number[]=[];
      for(var item of this.workinglist)
      {
        id_list.push(item.id);
      }
      var payload:any={stages: [...new Set(this.workinglist.map(item => item.tran_state))]};
      check_url=check_url.replace('{source_type}',this.source_type);
      this.dataService.post(check_url,payload).subscribe({next:(result:any)=>{
        this.screendata=result.items;
        this.show_dialog=true;

      },error:(error)=>{
        console.log(error);
        this.event.cast("top",{action:'toast',data:{severity:'error',details:error.error,summary:'Posting Error',key:'standard'}});
        this.complete.emit(true);
      }})
  }

  buttonpressed(event)
  {
      if (event.button.action_key=='cancel_dialog'){
        this.close_window();
      }
      if (event.button.action_key=='post_record')
      {
        this.post();
      }
  }

}
