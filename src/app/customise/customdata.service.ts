import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomdataService {

  constructor(private http:HttpClient) { }


  delete_menu(id:number)
  {
    return this.http.delete(environment.forms_api+"menutree/"+id);
  }


  get_menu()
  {
    return this.http.get(environment.forms_api+"menutree");
  }

  get_page()
  {
    return this.http.get(environment.forms_api+"page");
  }

  update(node:any)
  {
    return this.http.post(environment.forms_api+"menutree",node);
  }
}
