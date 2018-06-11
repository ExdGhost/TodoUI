import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'angular-alert-module';
import {StateService} from '../../services/state.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})

export class RegisterComponent {

  constructor(private auth: AuthService,  private state: StateService, private router: Router, private alerts: AlertsService) {}

  regForm = (form) => {

    if ( form.password !== form.cnfpassw) {
     this.alerts.setMessage('Passwords do not match !', 'error');
   } else if (form.password.length < 8) {
    this.alerts.setMessage('Password should be atleast 8 characters long !', 'error');
   } else {
    const fname = form.fname;
    const lname = form.lname;
    const email = form.email;
    const password = form.password;

    const payload = {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    };

    // Post request for user registration
    this.auth.register(payload, (status, message) => {
        if (status === 200) {
          this.alerts.setMessage('Registration successful, redirecting in 5 seconds', 'success');
          setTimeout(() => { this.state.changeMessage(true); this.navigate(); }, 5000);
         } else {
          this.alerts.setMessage(message, 'error');
         }
    });
  } // end of else
} // end of reg form

navigate = () => {
  this.router.navigate(['dashboard']).then(nav => {
   console.log(nav);
 }).catch(err => {
  console.log(err);
 });
}

    /* OLD reg
    axios.post('http://localhost:8080/services/register', payload,  {
       headers: {'Content-Type': 'application/json'}
    }).then(response => {
        if (response.status === 200) {
          sessionStorage.setItem('user', 'valid');
          sessionStorage.setItem('email', email);
          this.alerts.setMessage('Registration successful, redirecting in 5 seconds', 'success');
          setTimeout(() => { this.state.changeMessage(true); this.navigate(); }, 5000);
         } else {
          this.alerts.setMessage(response.data.message, 'error');
         }
      }).catch(err => {
      this.alerts.setMessage(err, 'error');
      });
    }
  } */

}
