import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {InplaceModule} from 'primeng/inplace';
import {InputTextModule} from 'primeng/inputtext';
import {OrderListModule} from 'primeng/orderlist';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import { MenubarComponent } from './menubar/menubar.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { UserControlComponent } from './user-control/user-control.component';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    MenubarComponent,
    FavouritesComponent,
    UserControlComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    OrderListModule,
    FormsModule,
    MenuModule,
    DropdownModule,
    InplaceModule,
    InputTextModule,
    DialogModule,
    OverlayPanelModule
  ],
  exports:[
    MenubarComponent
  ]
})
export class NavigationModule { }
