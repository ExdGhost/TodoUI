import { Injectable } from '@angular/core';
import * as moment from 'moment';
import axios from 'axios';


@Injectable()
export class AuthService {

    constructor() {

    }

    login(email: string, password: string , callback) {

      axios.get('http://localhost:8080/services/login?email=' + email + '&password=' + password).then(response => {
        if (response.status === 200) {
           this.setSession(response.data);
           return callback(response.status);
        } else {
          alert(response.data.message);
          return callback(response.status);
        }
    }).catch(err => {
        alert(err);
        // return callback(400);
      });
    } // end of login

    register(payload: Object, callback) {
        axios.post('http://localhost:8080/services/register', payload,  {
            headers: {'Content-Type': 'application/json'}
         }).then(response => {
             if (response.status === 200) {
            this.setSession(response.data);
            return callback(response.status, response.data.message);
              } else {
                return callback (response.status, response.data.message);
              }
           }).catch(err => {
              alert(err);
              // return callback(400);
           });
        } // end of register

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
