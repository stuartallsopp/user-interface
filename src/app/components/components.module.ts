import * as moment from 'moment'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { PanelComponent } from './panel/panel.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {MultiSelectModule} from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import {CheckboxModule} from 'primeng/checkbox';
import {MomentModule} from 'ngx-moment';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListComponent } from './list/list.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {ListboxModule} from 'primeng/listbox';
import {AvatarModule} from 'primeng/avatar';
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
import { FieldpickerComponent } from './fieldpicker/fieldpicker.component';
import { DebounceModule } from 'ngx-debounce';
import { AcSingleSearchComponent } from './fielddatatype/ac-single-search/ac-single-search.component';
import { DividerModule } from 'primeng/divider';
import { ListfilterComponent } from './listfilter/listfilter.component';
import { NoteViewerComponent } from './note-viewer/note-viewer.component';
import { NoteViewerDirDirective } from './note-viewer-dir.directive';
import { MentionModule } from 'angular-mentions';
import { PerioddateEntryComponent } from './fielddatatype/perioddate-entry/perioddate-entry.component';



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
    AcSingleEntryComponent,
    FieldpickerComponent,
    AcSingleSearchComponent,
    ListfilterComponent,
    NoteViewerComponent,
    NoteViewerDirDirective,
    PerioddateEntryComponent
  ],
  imports: [
    CommonModule,
    PanelModule,
    NgxUiLoaderModule,
    TableModule,
    CalendarModule,
    DebounceModule,
    KeyFilterModule,
    AvatarModule,
    InputSwitchModule,
    FieldsetModule,
    DividerModule,
    CheckboxModule,
    MultiSelectModule,
    ScrollPanelModule,
    DropdownModule,
    PaginatorModule,
    InputTextareaModule,
    TooltipModule,
    MentionModule,
    ListboxModule,
    MomentModule,
    AutoCompleteModule,
    FocusTrapModule,
    OverlayPanelModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MenuModule
  ],
  exports:[
    PanelComponent,ButtongroupComponent,NoteViewerComponent
  ]
})
export class ComponentsModule { }
