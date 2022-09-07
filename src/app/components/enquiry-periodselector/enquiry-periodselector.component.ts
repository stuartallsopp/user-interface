import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-enquiry-periodselector',
  templateUrl: './enquiry-periodselector.component.html',
  styleUrls: ['./enquiry-periodselector.component.scss']
})
export class EnquiryPeriodselectorComponent implements OnInit,OnChanges {

  @Input() search_model:any;
  public blocked:boolean=false;
  public values_change:boolean=false;
  @Output() period_changed:EventEmitter<any>=new EventEmitter<any>();

  public period_text:string='2022/01 - 20022/01';
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['search_model'])
    {
      this.resolvePeriodText();
    }
  }

  raise_change_event()
  {
      if (this.values_change==true)
      {
        this.period_changed.emit();
      }
  }

  initialise_change_event()
  {
    this.values_change=false;
  }

  ngOnInit(): void {
  }



  resolvePeriodText()
  {
    var text:string;
    var from=this.search_model.period_list.filter(p=>p.id==this.search_model.period_from)[0];
    if (from!=null)
    {
      text=from.description;
    }
    var to=this.search_model.period_list.filter(p=>p.id==this.search_model.period_to)[0];
    if (from!=null)
    {
      text=from.description;
    }
    if (from!=null&&to!=null)
    {
      text=from.description+" - "+to.description;
    }
    this.period_text=text;
  }
}
