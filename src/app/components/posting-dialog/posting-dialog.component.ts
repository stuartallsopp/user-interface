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

  @Output() complete:EventEmitter<any>=new EventEmitter<any>();

  public show_dialog:boolean=false;

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

  ngOnInit(): void {
  }


  posting()
  {
      var url=this.action.url;
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
      check_url=check_url.replace('{source_type}',this.action.source_type);
      this.dataService.post(check_url,payload).subscribe({next:(result)=>{

      },error:(error)=>{
        console.log(error);
        this.event.cast("top",{action:'toast',data:{severity:'error',details:error.error,summary:'Posting Error'}});
        this.complete.emit(true);
      }})

    // url=url.replace('{source_type}',this.source_type);
    // this.event.cast("top",{action:'open_progress'});
    // this.dataService.post(url,{ids:id_list}).subscribe({next:(result)=>{
    //     this.event.cast('top',{action:'close_progress'});
    //     this.refresh();
    // },
    // error:(error)=>{
    //   this.mess.add({severity:'error',key:'standard',detail:error.message,summary:'Posting Error'});
    //   this.event.cast('top',{action:'close_progress'});
    // }});
  }


}
