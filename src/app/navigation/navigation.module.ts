import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { MenubarComponent } from './menubar/menubar.component';



@NgModule({
  declarations: [
    MenubarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    OverlayPanelModule
  ],
  exports:[
    MenubarComponent
  ]
})
export class NavigationModule { }
