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

  get_page_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/page/"+id);
  }

  get_button_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/button/"+id);
  }

  get_column_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/column/"+id);
  }

  get_lookup_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/lookup/"+id);
  }

  get_field_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/field/"+id);
  }

  get_menu()
  {
    return this.http.get(environment.forms_api+"menutree");
  }

  get_page()
  {
    return this.http.get(environment.forms_api+"menutree/page");
  }

  get_lookup()
  {
    return this.http.get(environment.forms_api+"menutree/lookup");
  }

  get_column()
  {
    return this.http.get(environment.forms_api+"menutree/column");
  }

  get_button()
  {
    return this.http.get(environment.forms_api+"menutree/button");
  }

  get_field()
  {
    return this.http.get(environment.forms_api+"menutree/field");
  }

  update_button(button:any)
  {
    return this.http.post(environment.forms_api+"menutree/button",button);
  }

  update_lookup(lookup:any)
  {
    return this.http.post(environment.forms_api+"menutree/lookup",lookup);
  }

  update_field(field:any)
  {
    return this.http.post(environment.forms_api+"menutree/field",field);
  }

  update(node:any)
  {
    return this.http.post(environment.forms_api+"menutree",node);
  }
}
