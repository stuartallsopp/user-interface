import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: UntypedFormGroup;
  public dialogvisible!:any;

  constructor(private fb:UntypedFormBuilder, 
    private authService: AuthService, 
    private router: Router, private events: NgEventBus) {
      this.form = this.fb.group({
        email: ['',Validators.required],
        password: ['',Validators.required]
    });
     }

  ngOnInit(): void {
    this.dialogvisible=true;
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
        this.authService.login(val.email, val.password)
            .subscribe(
                () => {
                    this.events.cast("redraw",{key:"master"})
                    this.router.navigate(['landing']);
                }
            );
    }
}

}
