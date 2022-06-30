import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DragDropModule} from 'primeng/dragdrop';
import {ButtonModule} from 'primeng/button';
import { MenuDefinitionComponent } from './menu-definition/menu-definition.component';
import { FormDefinitionComponent } from './form-definition/form-definition.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuDefinitionComponent,
    FormDefinitionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    DropdownModule,
    AutoCompleteModule,
    DragDropModule,
    InputTextModule,
    ButtonModule
  ]
})
export class CustomiseModule { }
