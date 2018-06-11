import { Component, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from '../../services/state.service';
import { AlertsService } from 'angular-alert-module';
import {AuthService} from '../../services/auth.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent {

  constructor(private auth: AuthService, private state: StateService, private router: Router, private alerts: AlertsService) { }

  logForm(form) {

  const email = form.email;
  const password = form.password;

  this.auth.login(email, password, (status) => {
      if (status === 200 && this.auth.isLoggedIn()) {
        this.alerts.setMessage('Login successful', 'success');
        this.state.changeMessage(true);
        this.navigate2();
      } else {
        this.alerts.setMessage('Invalid Password/ Token expired', 'error');
      }
    });

  } // end of logForm

  navigate = () => {
    this.router.navigate(['register']).then(nav => {
      console.log(nav);
   }).catch(err => {
     console.log(err);
   });
  }

   navigate2 = () => {
    this.router.navigate(['dashboard']).then(nav => {
      console.log(nav);
   }).catch(err => {
     console.log(err);
   });
   }

}
