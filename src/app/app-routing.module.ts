import { NgModule } from '@angular/core';
import { AuthGuardService as AuthGuard } from './security/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PageComponent } from './pages/page/page.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { RecordComponent } from './pages/record/record.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'landing',component:LandingComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/:area',component:PageComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/:area/:section',component:PageComponent,canActivate:[AuthGuard]},
  {path:'pages/:module/:area/:section/:id',component:RecordComponent,canActivate:[AuthGuard]},
  {path:'error/:errono/:area',component:ErrorComponent},
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
