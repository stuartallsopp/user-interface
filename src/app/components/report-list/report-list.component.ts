import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { ToolService } from 'src/app/services/tool.service';
import { ListbaseComponent } from '../listbase/listbase.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent extends ListbaseComponent implements OnInit,OnChanges,OnDestroy {

  
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
      this.resolveFooterColumns();

    }
    if (changes['definition']||changes['data'])
    {
      console.log('ff');
      this.checkFilters();
    }
  }

  resolveFooterColumns()
  {

  }

  override ngOnInit(): void {
    super.ngOnInit();
  }



  override refresh(pageno:number=1,filters:any=null)
  {
    if (this.definition.data_url!=undefined&&this.definition.data_url!=null)
    {
      this.refreshFromUrl(pageno,this.current_filters);
    }
  }

}
