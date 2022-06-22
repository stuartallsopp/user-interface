import { Component, Input, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit {

  @Input() definition:any;
  @Input() data:any;

  constructor(public responsive:ResponsiveService) { }

  ngOnInit(): void {
  }

}
