import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import{BreadcrumbModule} from 'primeng/breadcrumb';
import{ButtonModule} from 'primeng/button';
import{DropdownModule} from 'primeng/dropdown';
import{OverlayPanelModule} from 'primeng/overlaypanel';
import{InputTextModule} from 'primeng/inputtext';
import{DividerModule} from 'primeng/divider';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ComponentsModule } from '../components/components.module';
import { DialogComponent } from './dialog/dialog.component';
import { RecordComponent } from './record/record.component';
import { ActionpanelComponent } from './actionpanel/actionpanel.component';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { NoteviewComponent } from './noteview/noteview.component';
import { BaseComponent } from './base/base.component';
import { TransactionComponent } from './transaction/transaction.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    LandingComponent,
    PageComponent,
    HomeComponent,
    ErrorComponent,
    BreadcrumbComponent,
    DialogComponent,
    RecordComponent,
    ActionpanelComponent,
    NoteviewComponent,
    BaseComponent,
    TransactionComponent,
    EnquiryComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    BreadcrumbModule,
    OverlayPanelModule,
    TableModule,
    InputTextModule,
    TabViewModule,
    DropdownModule,
    ButtonModule,
    ComponentsModule,
    FormsModule,
    DividerModule
  ],
  exports:[
    DialogComponent
  ]
})
export class PagesModule { }
