import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgEventBus } from 'ng-event-bus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PageService } from 'src/app/services/page.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { DataService } from 'src/app/services/data.service';
import { ConfirmationService } from 'primeng/api';
import { ToolService } from 'src/app/services/tool.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends BaseComponent implements OnInit,OnDestroy {



  constructor(
    route: ActivatedRoute, 
    router: Router,
    location:Location, 
    page:PageService,
    dataService:DataService,
   event:NgEventBus,
   loader: NgxUiLoaderService,
     responsive: ResponsiveService,
     confirm: ConfirmationService,
     tool: ToolService
  ) {
    super(route,router,location,page,dataService,event,loader,responsive,confirm,tool)
   }

   override get_page(_module:string,_area:string,_section:string)
   {
     this.record_type=_section;
     if (_module.toLowerCase()!="system")
     {
         this.dataService.get("lookup/resolve_transaction_type/"+_section).subscribe({
           next:(result:any)=>{
            if (result.edit_form_id!=undefined && result.edit_form_id!=null&&result.edit_form_id!=0)
            {
              this.get_specific_page(result.edit_form_id);
            }else
            {
              this.get_page_check(_module,'transactions',result.type,_section);
            }
           }
         })
     }else
     {
       this.get_page_check(_module,_area,_section);
     }
   }

}
