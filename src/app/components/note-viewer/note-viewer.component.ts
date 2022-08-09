import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { timeout } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent implements OnInit,OnChanges,AfterViewInit,AfterViewChecked {


  public currentcomment:string="";
  public current_user_id:number=0;
  public current_edit_id:number=0;


  public notes:any[]=[];
  public users:any[]=[];

  @Input() data:any;
  @Output() notemade:EventEmitter<any>=new EventEmitter<any>();

  initialised:boolean=false;
  record_type:string="";
  record_id:number=0;

  constructor(private dataService:DataService,private message:MessageService) { }

  ngAfterViewChecked(): void {

  }
  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'])
    {
      if (this.data!=undefined)
      {
        this.record_id=this.data.id;
        this.record_type=this.data.action_uri.type;
        this.getList();
      }

    }
  }

  clearedit()
  {
    this.currentcomment="";
    this.current_edit_id=0;
  }

  edit_current(item:any)
  {
    this.currentcomment=item.note_data;
    this.current_edit_id=item.id;
  }

  post_comment()
  {
    var data={id:this.current_edit_id,text:this.currentcomment,parent:this.record_id,type:this.record_type};
    this.dataService.postNote(data).subscribe({next:(result:any)=>{
      var idx=-1;
      if (this.current_edit_id!=0)
      {
        var check=this.notes.filter(p=>p.id==this.current_edit_id)[0];
        idx=this.notes.indexOf(check);
        this.notes[idx]=result;
      }else
      {
        this.notes.splice(0,0,result);
      }
      this.current_edit_id=0;
      this.currentcomment="";
      this.notemade.emit(true);
    }})
  }

  ngOnInit(): void {
    var user_id=localStorage.getItem("user_id");
    if (user_id==null){user_id="0"}
    this.current_user_id= Number.parseInt(user_id);
  }



  loadLazy(event:any)
  {


  }

  getList()
  {
      if (this.record_id!=0&&this.record_type!="")
      {
          this.dataService.getNotes(this.record_type,this.record_id).subscribe({next:(result:any)=>{
              this.notes=[...result.notes];
              this.users=[...result.users];
          },error:(error)=>{
              this.message.add({severity:"error",summary:"Error getting notes",detail:error.message});
          }});
      }
  }

}
