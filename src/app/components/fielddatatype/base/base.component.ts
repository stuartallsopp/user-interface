import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit,OnChanges {

  @Input() data:any={};
  @Input() definition:any;
  

  public local_data_source:any={value:null,resolved:null}
  public loader_key:string="";
  public unique_id:string=uuidv4();

  constructor(public dataService:DataService) { }
  ngOnChanges(changes: SimpleChanges): void {
     if (changes['data'])
     {

     }
  }


  checkKeyFilter(filter:string):any
  {
    const available:string[]=['int','pint','pnum','num','hex','email','alpha','alphanum'];
    if (filter==undefined||filter==null||filter==""){return null}
    if (available.filter(p=>p==filter)[0])
    {
      return filter;
    }
    return new RegExp(filter);
  }

  disableOn(value:string):boolean
  {
    if (value=="E"&&this.data.id!=0){return true;}
    if (value=="I"&&this.data.id==0){return true;}
    return false;
  }

  ngOnInit(): void {
  }

}
