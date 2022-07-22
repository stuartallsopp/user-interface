import { Component } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DialogComponent } from './pages/dialog/dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PageService } from './services/page.service';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SignalrService } from './services/signalr.service';
import { NoteviewComponent } from './pages/noteview/noteview.component';
import { DataService } from './services/data.service';
import { ImportWorkflowComponent } from './import/import-workflow/import-workflow.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[DialogService]
})
export class AppComponent  {
  title = 'user-interface';

  private event_listener:any;
  public progress_dialog_visible:boolean=false;
  public progress_message:any=null;

  constructor(
    private event:NgEventBus,
    private dialog: DialogService,
    private page:PageService,
    private dataService: DataService,
    private message: MessageService,
    private loading: NgxUiLoaderService,
    private router:Router,
    private signalr: SignalrService
  ) { 
    this.event_subscriber();
    this.signalr.connect();
  }
  event_subscriber() {
    this.event_listener=this.event.on("top").subscribe(result=>{
      switch(result.data.action)
      {
        case 'dialog':
          console.log(result);
          this.openDialog(parseInt(result.data.key),result.data);
          break;
        case 'goto':
          this.gotoPage(result.data.key,result.data);
          break;
        case 'note':
          this.openNote(result.data.id,result.data.source_type,result.data);
          break;
        case 'import':
          this.openImport(result.data.source_type,result.data);
          break;
        case 'open_progress':
          this.openProgress();
          break;
        case 'update_progress':
          this.updateProgress(result.data.message);
          break;
        case 'close_progress':
          this.closeProgress();
      }
      
    })
  }

  openProgress()
  {
    this.progress_dialog_visible=true;
  }

  updateProgress(source:any)
  {
      this.progress_message={...source};
      console.log(source);
  }

  closeProgress()
  {
    this.progress_dialog_visible=false;
  }

  gotoPage(url:string,content:any)
  {
    var routerLink=url.replace('{id}',content.id);
    routerLink=routerLink.replace('{source_type}',content.source_type);
    this.router.navigate([routerLink]);
  }

  openImport(source_type:string,content:any)
  {
    const ref=this.dialog.open(ImportWorkflowComponent,{
      data:{
        propertybag:{type:source_type,content:content}
      },
      header: "Import "+ source_type,
      width: "35%",
      closable:true,
      styleClass:'sa-dialog-scroll-fix',
      modal:true,
      closeOnEscape : true
    })
  }

  openNote(id:number,type:string,data:any)
  {
    console.log(data);
    this.loading.startBackgroundLoader("application");
    this.dataService.checkNoteType(type).subscribe({next:(result:any)=>{
      const ref=this.dialog.open(NoteviewComponent,
        {
          data:{
            propertybag:{id:id,type:result.type,description:data.data[result.record_description],code:data.data[result.record_code]}
          },
          header: "Notes for " + result.description,
          width : '30%',
          closable:true,
          styleClass:'sa-dialog-scroll-fix',
          modal:true,
          closeOnEscape : true
        });
    },
  error:(error)=>{
    this.message.add({key:"standard",severity:"error",detail:error.message});
    this.loading.stopBackgroundLoader("application");
  },
  complete:()=>{
    this.loading.stopBackgroundLoader("application");
  }
})
  }

  openDialog(id:number,content:any)
  {
    this.loading.startBackgroundLoader("application");
    console.log(content);
    this.page.getdialog(id,content.source_type).subscribe({next:(result:any)=>{
      const ref = this.dialog.open(DialogComponent, {
        data: {
            propertybag:content,
            definition: result
        },
        header: result.description,
        width: result.dialog_width + '%',
        height:'auto',
        closable : result.closeable,
        styleClass:'sa-dialog-scroll-fix',
        modal:true,
        closeOnEscape : result.closeable
    });
    },
    error:(error)=>{
        this.message.add({key:"standard",severity:"error",detail:error.message});
        this.loading.stopBackgroundLoader("application");
    },
    complete:()=>{
      this.loading.stopBackgroundLoader("application");
    }
  }
    );
  }
}
