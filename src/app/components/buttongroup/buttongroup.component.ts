import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { stringify } from 'querystring';
import { DecorationService } from 'src/app/services/decoration.service';

@Component({
  selector: 'app-buttongroup',
  templateUrl: './buttongroup.component.html',
  styleUrls: ['./buttongroup.component.scss']
})
export class ButtongroupComponent implements OnInit,OnChanges {

  localbuttons:any[]=[];
  items:MenuItem[]=[];

  @Output() itemselected:EventEmitter<any>=new EventEmitter<any>();
  @Input() buttons:any;
  @Input() data:any;
  @Input() rowIndex:number=-1;
  @Input() location:string="";
  @Input() from:string="";
  @Input() displayas:string="";

  constructor(public decor:DecorationService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buttons']||changes['data'])
    {
      this.initialiseButtons();
    }
  }

  ngOnInit(): void {
  }

  resolveColour(colour:string)
  {
    return 'p-button-'+colour;
  }

  sendevent(id:number)
  {
    var selected=this.localbuttons[id];
    this.itemselected.next({rowindex:this.rowIndex,button:selected,from:this.from});
  }

  resolvemenuclick(event:any)
  {
    this.sendevent(parseInt(event.item.id));
  }



  initialiseButtons()
  {
    var local_location=this.location;
    if (local_location=='page'){local_location='dialog'}
    this.localbuttons=this.buttons?.buttons.filter((p: { location: string; })=>p.location==local_location||p.location=='both');
    this.items=[];
    var idx=0;
    if (this.localbuttons!=null)
    {
      if (this.localbuttons.length>1)
      {
        for(const button of this.localbuttons)
        {
          var configs:any;
          if (button.aut_config!=undefined&&button.aut_config!=null)
          {
            configs=JSON.parse(button.aut_config);
          }
          if (this.checkVisible(configs)==true)
          {
            if (button.action_key=='divider')
            {
              this.items.push({separator:true});
            }else
            {
              this.items.push({label:button.label,id:idx.toString(),icon:button.icon,command:(event)=>{
                this.resolvemenuclick(event);
              }});
            }
          }
            idx++;
        }
      }
    }
  }
  checkVisible(configs):boolean
  {
    if (configs==undefined){return true;}
    if (configs.visible==undefined||configs.visible==null){return true;}
    if (configs.visible.options==undefined){return true;}
    var check=configs.visible.options.filter(p=>p.value==this.data[configs.visible.field])[0];
    if (check){return check.result;}
    return true;
  }
}
