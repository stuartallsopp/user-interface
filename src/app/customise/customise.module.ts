import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DragDropModule} from 'primeng/dragdrop';
import {ButtonModule} from 'primeng/button';
import { MenuDefinitionComponent } from './menu-definition/menu-definition.component';
import { FormDefinitionComponent } from './form-definition/form-definition.component';
import { FormsModule } from '@angular/forms';
import { FormOutlineComponent } from './form-outline/form-outline.component';
import { ColumnOutlineComponent } from './column-outline/column-outline.component';
import { FieldOutlineComponent } from './field-outline/field-outline.component';
import { ButtonOutlineComponent } from './button-outline/button-outline.component';



@NgModule({
  declarations: [
    MenuDefinitionComponent,
    FormDefinitionComponent,
    FormOutlineComponent,
    ColumnOutlineComponent,
    FieldOutlineComponent,
    ButtonOutlineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    TabViewModule,
    DropdownModule,
    AutoCompleteModule,
    InputNumberModule,
    DialogModule,
    InputSwitchModule,
    TableModule,
    InputTextareaModule,
    DragDropModule,
    InputTextModule,
    ButtonModule
  ]
})
export class CustomiseModule { }
