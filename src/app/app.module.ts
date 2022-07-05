import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInteceptor } from './security/auth-inteceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgEventBus } from 'ng-event-bus';
import {ToastModule} from 'node_modules/primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {SliderModule} from 'primeng/slider';
import {MessageModule} from 'primeng/message';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'node_modules/primeng/confirmdialog';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { SecurityModule } from './security/security.module';
import { PagesModule } from './pages/pages.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthGuardService } from './security/auth-guard.service';
import { NavigationModule } from './navigation/navigation.module';
import { MenuService } from './services/menu.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AngularDateHttpInterceptor } from './tools/dateIntecptor';
import { CustomiseModule } from './customise/customise.module';
import { SignalrService } from './services/signalr.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    SliderModule,
    PagesModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    DynamicDialogModule,
    NavigationModule,
    NgxUiLoaderModule,
    CustomiseModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInteceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AngularDateHttpInterceptor,
      multi: true,
    },
    AuthService,
    PermissionsService,
    MessageService,
    SignalrService,
    MenuService,
    NgEventBus,
    ConfirmationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
