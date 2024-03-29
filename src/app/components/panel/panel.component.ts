import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Panel } from 'primeng/panel';

import { DataService } from 'src/app/services/data.service';
import { DecorationService } from 'src/app/services/decoration.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit,OnChanges,AfterViewInit {

  @ViewChild(Panel) panelObject?:any;
  @Output() list_selection_changed:EventEmitter<any>=new EventEmitter<any>();
  @Input() definition:any;
  @Input() data:any;
  @Input() cacheid:string="";
  @Input() source_type:string="";
  @Input() dialog:boolean=false;
  @Input() panel_index:number;
  @Input() panel_from:string;

  public local_data:any;
  
  constructor(public responsive:ResponsiveService,private dataService:DataService, public decor:DecorationService,private renderer:Renderer2) { }
  ngAfterViewInit(): void {

    if (this.definition.colour!=null&&this.definition.colour!=""&&this.definition.colour!='none')
    {
      if (this.panelObject==undefined){return;}
      var el=this.panelObject.el.nativeElement;
      if (el==undefined){return;}
      var header=el.querySelector('.p-panel-header');
      if (header)
      {
        this.renderer.addClass(header,this.decor.bgcolour(this.definition.colour));
        this.renderer.addClass(header,this.decor.bgcolourtext(this.definition.colour));
        this.renderer.addClass(header,this.decor.bgcolouropac25(this.definition.colour));
        var icon=el.querySelector('.p-panel-header-icon');
        this.renderer.addClass(icon,this.decor.bgcolourtext(this.definition.colour));
      }
      var panel=el.querySelector('.p-panel-content');
      this.renderer.addClass(panel,this.decor.bgcolour(this.definition.colour));
      this.renderer.addClass(panel,this.decor.bgcolouropac10(this.definition.colour));
    }
  }
  ngOnChanges(changes: SimpleChanges): void {


    if (changes['definition']||changes['data'])
    {
        this.setData();
    }
  }

  setData()
  {
    if (this.definition.source_type!=undefined&&this.definition.source_type!=null)
    {
      this.source_type=this.definition.source_type;
    }
    if (this.data==undefined){return;}
    if (this.definition.data_field)
    {
      this.local_data=this.data[this.definition.data_field];
    }else
    {
      this.local_data=this.data;
    }
  }

  list_changed(event)
  {
    this.list_selection_changed.emit(event);
  }


  field_changed(event:any)
  {
    if (this.definition.data_field)
    {
      this.data[this.definition.data_field]=event;
      this.local_data=this.data[this.definition.data_field];

      if (this.local_data==null){this.setData();}
    }
  }

  ngOnInit(): void {
  }

}
