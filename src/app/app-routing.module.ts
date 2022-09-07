import { NgModule } from '@angular/core';
import { AuthGuardService as AuthGuard } from './security/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PageComponent } from './pages/page/page.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { RecordComponent } from './pages/record/record.component';
import { MenuDefinitionComponent } from './customise/menu-definition/menu-definition.component';
import { FormDefinitionComponent } from './customise/form-definition/form-definition.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'landing',component:LandingComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'pages/customise/menus',component:MenuDefinitionComponent,canActivate:[AuthGuard]},
  {path:'pages/customise/forms',component:FormDefinitionComponent,canActivate:[AuthGuard]},
  {path:'pages/enquiry',component:EnquiryComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/:area',component:PageComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/:area/:section',component:PageComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/records/:section/:id',component:RecordComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/records/:section/:id',component:RecordComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/transactions/:section/:id',component:TransactionComponent,canActivate:[AuthGuard]},
  {path:'error/:errono/:area',component:ErrorComponent},
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
