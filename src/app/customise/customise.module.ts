import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';
import {ChipModule} from 'primeng/chip';
import {AccordionModule} from 'primeng/accordion';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
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
import { LookupOutlineComponent } from './lookup-outline/lookup-outline.component';
import { ActionOutlineComponent } from './action-outline/action-outline.component';
import { PanelOutlineComponent } from './panel-outline/panel-outline.component';
import { PagecolumnOutlineComponent } from './pagecolumn-outline/pagecolumn-outline.component';
import { ActioncustomOutlineComponent } from './actioncustom-outline/actioncustom-outline.component';
import { ListOutlineComponent } from './list-outline/list-outline.component';
import { PanelEditComponent } from './panel-edit/panel-edit.component';
import { FieldEditComponent } from './field-edit/field-edit.component';
import { NewobjectpoupComponent } from './newobjectpoup/newobjectpoup.component';
import { SundryfieldOutlineComponent } from './sundryfield-outline/sundryfield-outline.component';



@NgModule({
  declarations: [
    MenuDefinitionComponent,
    FormDefinitionComponent,
    FormOutlineComponent,
    ColumnOutlineComponent,
    FieldOutlineComponent,
    ButtonOutlineComponent,
    LookupOutlineComponent,
    ActionOutlineComponent,
    PanelOutlineComponent,
    PagecolumnOutlineComponent,
    ActioncustomOutlineComponent,
    ListOutlineComponent,
    PanelEditComponent,
    FieldEditComponent,
    NewobjectpoupComponent,
    SundryfieldOutlineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    TabViewModule,
    DropdownModule,
    AutoCompleteModule,
    InputNumberModule,
    AccordionModule,
    DynamicDialogModule,
    DialogModule,
    ChipModule,
    InputSwitchModule,
    TableModule,
    InputTextareaModule,
    DragDropModule,
    InputTextModule,
    ButtonModule
  ],
  providers:[DialogService]
})
export class CustomiseModule { }
