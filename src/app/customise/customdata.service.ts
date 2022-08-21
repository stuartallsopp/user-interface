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

  get_list_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/list/"+id);
  }

  get_chart_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/chart/"+id);
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

  get_sundryfield_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/sundryfield/"+id);
  }

  get_action_by_id(id:number)
  {
    return this.http.get(environment.forms_api+"menutree/action/"+id);
  }

  get_menu()
  {
    return this.http.get(environment.forms_api+"menutree");
  }

  get_page()
  {
    return this.http.get(environment.forms_api+"menutree/page");
  }

  get_action()
  {
    return this.http.get(environment.forms_api+"menutree/action");
  }

  clear_cache()
  {
    return this.http.get(environment.forms_api+"page/clearcache");
  }

  get_cache()
  {
    return this.http.get(environment.forms_api+"page/cache");
  }

  delete_cache(key:string)
  {
    return this.http.delete(environment.forms_api+"page/clearcache/"+key);
  }

  cache_all_pages()
  {
    return this.http.post(environment.forms_api+"menutree/page/cache",{});
  }

  get_list()
  {
    return this.http.get(environment.forms_api+"menutree/list");
  }

  get_chart()
  {
    return this.http.get(environment.forms_api+"menutree/chart");
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

  get_sundryfield()
  {
    return this.http.get(environment.forms_api+"menutree/sundryfield");
  }

  update_button(button:any)
  {
    return this.http.post(environment.forms_api+"menutree/button",button);
  }

  update_column(column:any)
  {
    return this.http.post(environment.forms_api+"menutree/column",column);
  }

  update_lookup(lookup:any)
  {
    return this.http.post(environment.forms_api+"menutree/lookup",lookup);
  }

  update_form(form:any)
  {
    return this.http.post(environment.forms_api+"menutree/page",form);
  }

  update_list(list:any)
  {
    return this.http.post(environment.forms_api+"menutree/list",list);
  }

  update_chart(chart:any)
  {
    return this.http.post(environment.forms_api+"menutree/chart",chart);
  }

  update_field(field:any)
  {
    return this.http.post(environment.forms_api+"menutree/field",field);
  }

  update_sundryfield(field:any)
  {
    return this.http.post(environment.forms_api+"menutree/sundryfield",field);
  }

  update_action(action:any)
  {
    return this.http.post(environment.forms_api+"menutree/action",action);
  }

  update(node:any)
  {
    return this.http.post(environment.forms_api+"menutree",node);
  }
}
