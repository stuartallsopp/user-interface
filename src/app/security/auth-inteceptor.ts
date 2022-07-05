import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {AuthService} from "../services/auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { SignalrService } from "../services/signalr.service";


@Injectable({
    providedIn: 'root'
  })
export class AuthInteceptor implements HttpInterceptor {
    constructor(private auth:AuthService,private signalr:SignalrService){}
    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

  var idToken:any = "";
  if (req.url.indexOf(environment.forms_api)>=0)
  {
    idToken=localStorage.getItem("form_token");
  }else
  {
      idToken=localStorage.getItem("data_token");
  }
  
  var connectionid=this.signalr.getConnectionId();
  if (connectionid==undefined||connectionid==null)
  {
    connectionid="";
  }

  if (idToken) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken).set("signalR",connectionid)
      });

    //  cloned.headers.set("signalR",this.signalr.getConnectionId());

      return next.handle(cloned);
  }
  else {
    return next.handle(req).pipe(catchError(err => {
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.auth.logout();
            //location.reload();
        }

        const error = err.error?.message || err.statusText;
        return throwError(error);
    }))
  }
}
}
