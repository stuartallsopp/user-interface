import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule} from 'primeng/steps';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CardModule} from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FileUploadModule} from 'primeng/fileupload';
import { ImportWorkflowComponent } from './import-workflow/import-workflow.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    ImportWorkflowComponent
  ],
  imports: [
    CommonModule,
    StepsModule,
    PanelMenuModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    CardModule,
    NgxUiLoaderModule,
    TagModule,
    FileUploadModule
  ]
})
export class ImportModule { }
