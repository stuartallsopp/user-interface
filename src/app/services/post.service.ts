import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private dataService:DataService) { }


  check(items:any[],type:string)
  {
    var url:string="";
    var payload:any={};
    return this.dataService.post(url,payload);
  }
}
