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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[DialogService]
})
export class AppComponent  {
  title = 'user-interface';

  private event_listener:any;

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
      }
      
    })
  }


  gotoPage(url:string,content:any)
  {
    var routerLink=url.replace('{id}',content.id);
    routerLink=routerLink.replace('{source_type}',content.source_type);
    this.router.navigate([routerLink]);
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
    this.page.getdialog(id).subscribe({next:(result:any)=>{
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
