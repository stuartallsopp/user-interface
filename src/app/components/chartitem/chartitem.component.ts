import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chartitem',
  templateUrl: './chartitem.component.html',
  styleUrls: ['./chartitem.component.scss']
})
export class ChartitemComponent implements OnInit,OnChanges {

  public config:any;
  public chart_data:any;
  @Input() data_set:any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
     this.initialise_chart();
  }

  ngOnInit(): void {
  }


  getColor(color:string)
  {
    return getComputedStyle(document.documentElement).getPropertyValue(color);
  }

  initialise_chart()
  {
   
    this.chart_data={
      labels: this.data_set.labels,
      datasets:[{
        data:this.data_set.data,
        backgroundColor:(ctx)=>{
          if (ctx.dataIndex==0){return this.getColor('--bs-secondary');}
          if (ctx.dataIndex==this.data_set.data.length-1){return this.getColor('--bs-secondary');}
          if (this.data_set.calcs[ctx.dataIndex]==true){return this.getColor('--bs-secondary');}
          var item=this.data_set.data[ctx.dataIndex];
          if (item[0]<item[1]){return this.getColor('--bs-success');}
          if (item[0]>=item[1]){return this.getColor('--bs-danger');}
          return this.getColor('--bs-secondary');
        }
    }]
    };
    this.config={
      type: 'bar',
      data: this.chart_data,
      options: {
        responsive: true,
        scales:{
          x:{display:false}
        },
        plugins: {
          legend: {
            position: 'top',
            display:false,
          },
          title: {
            display: true,
            text: this.data_set.title
          }
        }
      }
    };
  }
}
