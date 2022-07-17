import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-mdl-entry',
  templateUrl: './mdl-entry.component.html',
  styleUrls: ['./mdl-entry.component.scss']
})
export class MdlEntryComponent extends BaseComponent implements OnInit,OnChanges {

  public options:any[]=[];
  public searching:boolean=false;
  public resultsets:any={};
  public displaycount:number;
  constructor(ds:DataService,event:NgEventBus) {
    super(ds,event);
   }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']||changes['definition'])
    {
        this.local_data_source=this.data[this.definition.fieldname];
        this.buildOptions();
    }
  }

  searchSegment(event:any,segment:any)
  {
    var search:any[]=[];
    this.searching=true;
    search.push({type:"begins","column":segment.search_field,"value":event.query});
  
    this.dataService.list(segment.url,50,0,"id","asc",search).subscribe(
        {next:(result:any)=>{
          this.resultsets[segment.type]=result.records;
          this.searching=false;
        }}
      );
  }

  item_selected(item:any)
  {
    this.updateDisplayCode();
  }

  updateDisplayCode()
  {
    var result='';
    for(var opt of this.options)
    {
      if (opt.record!=null)
      {
        result=result+opt.record.code + "-";
      }else{
        result=result+'????-';
      }
    }
    if (result.length>0)
    {
      result=result.substring(0,result.length-1);
    }
    this.local_data_source.display_code=result;
    return result;
  }

  resolveDefinition(input:any)
  {
    var result:any={};
    result.label=input.title;
    result.fieldname='record';
    result.compulsory=input.compulsory;
    result.data_url=input.url;
    result.data_url_method='POST';
    result.data_url_param='{"search":"ddescription","order":"code"}';
    result.aut_config='{"label":"description","id":"id"}';
    return result;
  }

  buildOptions()
  {
    if (this.local_data_source!=undefined)
    {
      console.log(this.local_data_source);
      this.displaycount=this.local_data_source.lines.length<3?this.local_data_source.lines.length:3;
      this.options=[];
      for(var x=0;x<this.local_data_source.lines.length;x++)
      {
        if (x<this.displaycount)
        {
          this.local_data_source.lines[x].visible=true;
        }else
        {
          this.local_data_source.lines[x].visible=false;
        }
        this.options.push(this.local_data_source.lines[x]);
        this.resultsets[this.local_data_source.lines[x].type]=[];
      }
    }
  }

}
