import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-import-workflow',
  templateUrl: './import-workflow.component.html',
  styleUrls: ['./import-workflow.component.scss']
})
export class ImportWorkflowComponent implements OnInit,OnDestroy {

  private unique_id:string=uuidv4();
  @ViewChild(FileUpload) uploader:FileUpload;
  public upload_url:string="";
  private source_type:string="";
  public importobject:any=null;
  public currentsheet:any=null;
  private eventsubscription:any=null;
  public message:any[]=[];
  private propertybag:any=null;
  public items:MenuItem[]=[];
  public workflow: MenuItem[]=[{label:'Import'},{label:'Map'},{label:'Process'},{label:'Results'}];
  public currentIndex:number=0;
  public ready:boolean=true;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private dataService: DataService,
    private loading: NgxUiLoaderService,
    private event:NgEventBus
  ) { }

  ngOnInit(): void {
    console.log(this.config.data);
    this.propertybag=this.config.data.propertybag;
    this.source_type=this.propertybag.content.source_type;
    this.upload_url=environment.data_api+"import/"+this.source_type;
    this.subscribetoEvents();
  }

  ngOnDestroy(): void {
    if (this.eventsubscription!=null)
    {
      this.eventsubscription.unsubscribe();
    }
    this.eventsubscription=null;
  }

  subscribetoEvents()
  {
    this.eventsubscription=this.event.on(this.unique_id).subscribe({next:(result)=>{
        this.message.push(result.data.message);
    }})
  }

  fileUpload(event:any)
  {
    this.loading.stopLoader("import_loader");
    if (event.originalEvent.status==200)
    {
      this.importobject=event.originalEvent.body;
      this.currentsheet=this.importobject.sheets[0];
      this.currentIndex++;
    }
    else
    {
      this.currentIndex=0;
      this.importobject=null;
    }
    this.ready=true;
  }

  initialise()
  {
    this.currentIndex=0;
    this.importobject=null;
  }

  previousPage()
  {
    this.currentIndex--;
  }

  nextPage()
  {
    if (this.currentIndex==0&&this.importobject==null)
    {
      this.ready=false;
      this.loading.startLoader("import_loader");
        this.uploader.upload();
    }else if (this.currentIndex>0||this.importobject!=null)
    {
      this.currentIndex++;
    }
    if (this.currentIndex==3)
    {
      this.runImport();
    }
    if (this.currentIndex>this.workflow.length-1)
    {
      this.ref.close();
      this.event.cast(this.propertybag.content.from,{type:'redraw'});
    }
  }

  runImport()
  {
    this.loading.startLoader("import_loader");
    this.message=[];
    var payload:any={id:this.importobject.id,sheet:this.currentsheet.sheetName,ignorefirstrow:this.currentsheet.ignoreFirstRow,mappings:[],respondto:this.unique_id};
    for(var item of this.currentsheet.mappings)
    {
      if (item.fieldname!='not set')
      {
        payload.mappings.push({colno:item.colno,field:item.fieldname});
      }
    }
    this.dataService.post("import/"+this.source_type+"/process",payload).subscribe({next:(result)=>{
      this.loading.stopLoader("import_loader");
    },error:(error)=>{
      this.loading.stopLoader("import_loader");
    }})
  }
}
