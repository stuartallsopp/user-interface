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
  public sidebar_visible:boolean=false;
  public sidebar_values:any[]=[];

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
          this.openDialog(parseInt(result.data.key),result.data);
          break;
        case 'goto':
          this.gotoPage(result.data.key,result.data);
          break;
        case 'note':
          this.openNote(result.data.id,result.data.source_type,result.data);
          break;
        case 'info':
          this.openInfo(result.data);
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
          break;
        case 'toast':
          this.raiseError(result.data.data);
          break;
      }
      
    })
  }

  raiseError(message:any)
  {
    this.message.add({severity:message.severity,summary:message.summary,detail:message.detail,key:'standard'});
  }

  openProgress()
  {
    this.progress_dialog_visible=true;
  }

  updateProgress(source:any)
  {
      this.progress_message={...source};
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
    this.dataService.get("import/checktype/"+source_type).subscribe({next:(result:any)=>{
      
      const ref=this.dialog.open(ImportWorkflowComponent,{
        data:{
          propertybag:{type:result.type,content:content,title:result.title}
        },
        header: "Import "+ result.title,
        width: "35%",
        closable:true,
        styleClass:'sa-dialog-scroll-fix',
        modal:true,
        closeOnEscape : true
      })

    },error:(error)=>{
      this.message.add({severity:"error",summary:"Import Error",detail:error.message});
    }})
  }

  openInfo(data:any)
  {
    this.sidebar_values=Object.entries(data.data);
    this.sidebar_values=this.sidebar_values.filter(p=>!p[0].endsWith('_id')&&p[0]!='id'&&!p[0].endsWith('_no')&&!p[0].endsWith('_uri')&&p[1]!=null);
    this.sidebar_visible=true;
  }

  checkType(value:any)
  {
    if (value instanceof Date){return 'date';}
    return '';
  }

  titleCase(input:string)
  {
    input=this.replaceAll(input,'_',' ');
    return input;
  }

   replaceAll(str:string, find:string, replace:string) {
    return str.toString().replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  openNote(id:number,type:string,data:any)
  {
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
        styleClass:'sa-dialog-scroll-fix shadow-9',
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
