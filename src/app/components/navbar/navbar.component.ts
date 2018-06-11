import { Component , Input, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from '../../services/state.service';
import {AuthService} from '../../services/auth.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})

export class NavbarComponent implements OnInit {

  message: Boolean;
  constructor(private auth: AuthService, private state: StateService, private router: Router, private alerts: AlertsService) {}

 ngOnInit() {
  this.listner();
}

 listner = () => {
  this.state.currentMessage.subscribe((message: Boolean) => {
     this.message = message;
    console.log('login triggered message = ' , this.message);
  });
}
  logout = () => {
   this.auth.logout();
   console.log(this.message);
   this.state.changeMessage(false);
   // this.alerts.setMessage('You have been logged out', 'warning');
   alert('You have been logged out');
   this.navigateLogin();
  }

  navigateLogin = () => {
    this.router.navigate(['login']).then(nav => {
      console.log(nav);
   }).catch(err => {
     console.log(err);
   });
  }

}
