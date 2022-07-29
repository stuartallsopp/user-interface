import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import { map, shareReplay ,tap} from 'rxjs/operators';
import * as moment from "moment";
import { User } from '../security/user';
import { environment } from 'src/environments/environment';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private permission: PermissionsService) { }

  login(email:string, password:string ) {

    return forkJoin(this.callForm(email,password),this.callData(email,password))
    .pipe(map(result=>{
      this.setSession(result);
    }));       
}

public getOrganisationName():string
{
  var name=localStorage.getItem("organisation_name");
  if (name==null){return "Unknown";}
  return name;
}

public getOrganisationId():number
{
  var no:number=parseInt(localStorage.getItem("organisation"));
  if (no==null){return 0;}
  return no;
}

public getUserName():string
{
  var name=localStorage.getItem("username");
  if (name==null){return "Unknown";}
  return name;
}

private callForm(email:string,password:string)
{
  return this.http.post<User>(environment.forms_api+'users/authenticate',{email,password});
}

private callData(email:string,password:string)
{
  return this.http.post<User>(environment.data_api+'users/authenticate',{email,password});
}

private changeorgForm(orgid:number)
{
  return this.http.post<any>(environment.forms_api+'users/changeorganisation',{id:orgid});
}

private changeorgData(orgid:number)
{
  return this.http.post<any>(environment.data_api+'users/changeorganisation',{id:orgid});
}

public changeOrganisation(orgid:number)
{

  return forkJoin(this.changeorgForm(orgid),this.changeorgData(orgid))
  .pipe(map(result=>{
    localStorage.setItem('data_token',result[1].token);
    localStorage.setItem('form_token',result[0].token);
    localStorage.removeItem('menu');
    this.permission.reset();
  }));
}

public getMyOrganisations()
{
  var id=localStorage.getItem("user_id");
  return this.http.get<any[]>(environment.data_api+'users/myorganisations');
}
      
private setSession(authResult:any[]) {
    var dataSession=authResult.filter(p=>p.type=='data')[0];
    var formSession=authResult.filter(p=>p.type=='form')[0];
    if (dataSession!=null)
    {
      const expiry = (JSON.parse(atob(dataSession.token.split('.')[1]))).exp;
      localStorage.setItem('data_token', dataSession.token);
      localStorage.setItem('organisation',dataSession.organisation);
      localStorage.setItem('organisation_name',dataSession.orgName);
      localStorage.setItem('username',dataSession.username);
      localStorage.setItem("data_expires_at", expiry );
    }
    if (formSession!=null)
    {
      const expiry = (JSON.parse(atob(dataSession.token.split('.')[1]))).exp;
      localStorage.setItem('form_token', formSession.token);
      localStorage.setItem("form_expires_at", expiry);
      localStorage.setItem("user_id",formSession.id);
    }
}          

logout() {
  localStorage.clear();
  this.permission.reset();
}

public isLoggedIn() {
  const current =(Math.floor((new Date).getTime() / 1000));
  var expiration=this.getExpiration();
  return (expiration>current);
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration:any = localStorage.getItem("form_expires_at");
    return expiration;
}    
}
