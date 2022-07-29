import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit {

  constructor(private event:NgEventBus,private auth:AuthService,private router:Router) { }


  public currentorg:any=null;
  public org_list:any[]=[];
  public items:MenuItem[]=[];
  @Input() op:OverlayPanel

  ngOnInit(): void {
    this.buildMenu();
    this.buildDefaults();
  }

  buildMenu()
  {
    this.items=[];
  //  this.items.push({label:this.auth.getOrganisationName(),icon:'fa-solid fa-home'});
    this.items.push({label:this.auth.getUserName(),icon:'fa-solid fa-user'});
  }

  logout()
  {
    this.auth.logout();
    this.event.cast('menu',{'redraw':true});
    this.router.navigate(['/login']);
    this.op.hide();

  }

  buildDefaults()
  {
    this.currentorg={organisation_name:this.auth.getOrganisationName(),org_id:this.auth.getOrganisationId()};
    this.auth.getMyOrganisations().subscribe({next:(result)=>{
      this.org_list=result;
    }})
  }

}
