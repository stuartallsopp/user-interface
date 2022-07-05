import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-lookup-outline',
  templateUrl: './lookup-outline.component.html',
  styleUrls: ['./lookup-outline.component.scss']
})
export class LookupOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {

  }


  updateEdit()
  {
      this.dataService.update_lookup(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }
}
