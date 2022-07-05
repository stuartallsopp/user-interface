import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent implements OnInit,OnChanges {


  public notes:any[]=[];
  public users:any[]=[];

  @Input() data:any;

  record_type:string="";
  record_id:number=0;

  constructor(private dataService:DataService,private message:MessageService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'])
    {
      this.record_id=this.data.id;
      this.record_type=this.data.action_uri.type;
      this.getList();
    }
  }

  ngOnInit(): void {
  }

  getList()
  {
      if (this.record_id!=0&&this.record_type!="")
      {
          this.dataService.getNotes(this.record_type,this.record_id).subscribe({next:(result:any)=>{
              this.notes=result.notes;
              this.users=result.users;
          },error:(error)=>{
              this.message.add({severity:"error",summary:"Error getting notes",detail:error.message});
          }});
      }
  }

}
