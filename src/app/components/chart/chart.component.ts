import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { ToolService } from 'src/app/services/tool.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit,OnChanges {

  @Input() definition:any;
  @Input() data:any;
  @Input() source_type:string="";

  public loader_key:string="";
  public unique_id:string=uuidv4();


  constructor(
    private dataService:DataService,
    private loader:NgxUiLoaderService,
    private event:NgEventBus,
    private mess:MessageService,
    private confirm:ConfirmationService,
    private tool:ToolService
    ) {

   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['definition'])
      {
        this.loader_key="chart_"+this.definition.id;
      }
  }

   ngOnInit(): void {

  }

}
