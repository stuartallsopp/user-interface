import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-analysis-panel',
  templateUrl: './analysis-panel.component.html',
  styleUrls: ['./analysis-panel.component.scss']
})
export class AnalysisPanelComponent implements OnInit,OnChanges,AfterViewInit {


  public data:any;

  constructor(private dataService:DataService) { }
  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }

  @Input() visible:boolean;

  sourcechanged(event)
  {
    var source_type="";
    console.log(event);
    if (event.subtype!='gen_record'&&event.subtype!='dat_record'){
      this.data=null;
      this.visible=false;
      return;
    }
    if (event.subtype=='dat_record')
    {
      source_type=event.type;
    }else
    {
      source_type='nominal';
    }
    this.getData(event.value.id,source_type);
  }

  getData(id:number,type:string)
  {
    var url="analysis/turnover/"+type+"/"+id.toString();
    this.dataService.get(url).subscribe({next:(result)=>{
      this.data=result;
    }})
  }
}
