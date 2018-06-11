import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor (private router: Router, private state: StateService) {}

  ngOnInit = () => {
   /* localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.state.changeMessage(false);
    this.router.navigate(['login']).then(nav => {
      console.log(nav);
   }).catch(err => {
     console.log(err);
   }); */
  }
}
