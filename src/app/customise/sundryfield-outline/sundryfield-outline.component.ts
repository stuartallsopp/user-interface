import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomdataService } from '../customdata.service';

@Component({
  selector: 'app-sundryfield-outline',
  templateUrl: './sundryfield-outline.component.html',
  styleUrls: ['./sundryfield-outline.component.scss']
})
export class SundryfieldOutlineComponent implements OnInit {

  @Input() fullPage:any;
  @Input() lookuplist:any;
  @Input() actionlist:any;
  @Output() done:EventEmitter<any>=new EventEmitter<any>();

  public field_edit_display:boolean=false;
  public edited_field:any=null;
  public edited_row:number=0;

  constructor(private dataService:CustomdataService) { }

  ngOnInit(): void {
  }


  updateEdit()
  {
      this.dataService.update_sundryfield(this.fullPage).subscribe({
        next:(result)=>{
            this.done.emit(result);
        }
      })
  }








}
