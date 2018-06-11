import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private messageSource = new BehaviorSubject<Boolean>(false);
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage = (message: Boolean) => {
    this.messageSource.next(message);
  }

}
