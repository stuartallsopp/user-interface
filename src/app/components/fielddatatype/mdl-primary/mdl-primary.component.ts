import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DataService } from 'src/app/services/data.service';
import { MdlCommonService } from 'src/app/services/mdl-common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-mdl-primary',
  templateUrl: './mdl-primary.component.html',
  styleUrls: ['./mdl-primary.component.scss']
})
export class MdlPrimaryComponent extends BaseComponent implements OnInit,OnChanges {


  public options:any[]=[];
  public searching:boolean=false;
  public resultsets:any={};
  public displaycount:number;
  public blocked:boolean=false;

  constructor(ds:DataService,event:NgEventBus,public common:MdlCommonService,public responsive:ResponsiveService) {
    super(ds,event);
   }

   public primary_object:any;
   public primary_definition:any;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['definition']||changes['data'])
    {
      this.local_data_source=this.data[this.definition.fieldname];
      this.buildOptions();
        this.defineSettings();
    }
  }


  resolveAdditionalDescriptions():any[]
  {
      var result=[];
      for(var x=1;x<this.local_data_source.lines.length;x++)
      {
        if (this.local_data_source.lines[x].record!=null)
        {
          result.push({
            description:this.local_data_source.lines[x].record.description,
            icon:this.local_data_source.lines[x].record.icon,
            colour:this.local_data_source.lines[x].record.colour
          })
        }
      }
      return result;
  }

  defineSettings()
  {
    if (this.definition&&this.data)
    {
      this.primary_object=this.data[this.definition.fieldname]['lines'][0];
      this.primary_definition={label:'',fieldname:'description',context_param:null,type:'tex_disp'};
    }
  }



  searchSegment(event:any,segment:any)
  {
    var search:any[]=[];
    this.searching=true;
    search.push({type:"begins",column:segment.search_field,value:event.query});
    if (segment.type!='nominal')
    {
      search.push({type:'isin',column:'type',value:segment.type_resolved.split(',')})
    }
    console.log(search);
    this.dataService.list(segment.url,50,0,"id","asc",search).subscribe(
        {next:(result:any)=>{
          this.resultsets[segment.type]=result.records;
          this.searching=false;
        }}
      );
  }

  override setsubscribers(): void {
    this.common.setSubscribers(this.registered_subscriptions);
  }

  buildOptions()
  {
    if (this.local_data_source!=undefined)
    {
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
