import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { ToolService } from 'src/app/services/tool.service';
import { v4 as uuidv4 } from 'uuid';
import { ListbaseComponent } from '../listbase/listbase.component';

@Component({
  selector: 'app-listi',
  templateUrl: './listi.component.html',
  styleUrls: ['./listi.component.scss']
})
export class ListiComponent extends ListbaseComponent implements OnInit,OnChanges {




  constructor(
    dataService:DataService,
    loader:NgxUiLoaderService,
    event:NgEventBus,
    mess:MessageService,
    confirm:ConfirmationService,
    tool:ToolService
    ) {
      super(dataService,loader,event,mess,confirm,tool);
   }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges): void {

    super.ngOnChanges(changes);

    if (changes['definition'])
    {
      this.loader_key="list_"+this.definition.id;
    }
    if (changes['definition']||changes['data'])
    {
      this.refresh(this.current_page);
    }
  }


  loadMore()
  {
    this.current_page++;
    this.refreshFromUrl(this.current_page,null,true);
  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.event_subscription();
    this.list_content=[];
    this.record_count=0;
  }


  override refresh(pageno:number=1,filters:any=null)
  {
    if (this.definition.data_field?.length>0 && this.data!=null&&this.data!=undefined)
    {
      this.list_content=this.data[this.definition.data_field];
      this.record_count=this.list_content.length;
    }
    if (this.definition.data_url!=undefined&&this.definition.data_url!=null)
    {
      this.refreshFromUrl(pageno,filters,false);
    }
  }




  

}
