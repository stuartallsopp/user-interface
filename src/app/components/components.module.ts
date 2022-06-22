import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { PanelComponent } from './panel/panel.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListComponent } from './list/list.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ListcolumnComponent } from './listcolumn/listcolumn.component';
import { ListColTextComponent } from './listdatatype/text/list-col-text.component';
import { ListColNumberComponent } from './listdatatype/list-col-number/list-col-number.component';
import { ListColDateComponent } from './listdatatype/list-col-date/list-col-date.component';
import { ButtongroupComponent } from './buttongroup/buttongroup.component';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { TextEntryComponent } from './fielddatatype/text-entry/text-entry.component';
import { FormsModule } from '@angular/forms';
import { NumberEntryComponent } from './fielddatatype/number-entry/number-entry.component';
import { BaseComponent } from './fielddatatype/base/base.component';
import { DateEntryComponent } from './fielddatatype/date-entry/date-entry.component';
import { StndDisplayComponent } from './fielddatatype/stnd-display/stnd-display.component';
import { PlistEntryComponent } from './fielddatatype/plist-entry/plist-entry.component';
import { SwitchEntryComponent } from './fielddatatype/switch-entry/switch-entry.component';
import { ListColLookupComponent } from './listdatatype/list-col-lookup/list-col-lookup.component';
import { AutocompleteEntryComponent } from './fielddatatype/autocomplete-entry/autocomplete-entry.component';
import { AcSingleEntryComponent } from './fielddatatype/ac-single-entry/ac-single-entry.component';



@NgModule({
  declarations: [
    PanelComponent,
    ListComponent,
    ListcolumnComponent,
    ListColTextComponent,
    ListColNumberComponent,
    ListColDateComponent,
    ButtongroupComponent,
    FieldsetComponent,
    TextEntryComponent,
    NumberEntryComponent,
    BaseComponent,
    DateEntryComponent,
    StndDisplayComponent,
    PlistEntryComponent,
    SwitchEntryComponent,
    ListColLookupComponent,
    AutocompleteEntryComponent,
    AcSingleEntryComponent
  ],
  imports: [
    CommonModule,
    PanelModule,
    NgxUiLoaderModule,
    TableModule,
    CalendarModule,
    KeyFilterModule,
    InputSwitchModule,
    CheckboxModule,
    DropdownModule,
    AutoCompleteModule,
    OverlayPanelModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MenuModule
  ],
  exports:[
    PanelComponent,ButtongroupComponent
  ]
})
export class ComponentsModule { }
