import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule} from 'primeng/steps';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CardModule} from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { FileUploadModule} from 'primeng/fileupload';
import { ImportWorkflowComponent } from './import-workflow/import-workflow.component';
import { FormsModule } from '@angular/forms';



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
    CardModule,
    FileUploadModule
  ]
})
export class ImportModule { }
