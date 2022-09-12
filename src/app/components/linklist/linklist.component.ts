import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-linklist',
  templateUrl: './linklist.component.html',
  styleUrls: ['./linklist.component.scss']
})
export class LinklistComponent implements OnInit,OnChanges {

  @Input() definition:any;
  @Input() data:any;

  public list_data:any[]=[];
  constructor(public responsive:ResponsiveService,private event:NgEventBus) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['definition']&&this.definition.aut_config)
    {
      var configs=JSON.parse(this.definition.aut_config)
      this.list_data=configs?.links;
    }
  }

  actionItem(link:any)
  {
    this.event.cast("top",{"action":"redirect","url":link.link});
  }

  ngOnInit(): void {
  }

}
