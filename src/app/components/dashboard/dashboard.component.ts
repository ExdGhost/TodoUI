import { Component, OnInit } from '@angular/core';
import {TodoDataService} from '../../services/todo-data.service';
import { AlertsService } from 'angular-alert-module';
import {StateService} from '../../services/state.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Todo} from '../../classes/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TodoDataService, AuthService]
})

export class DashboardComponent implements OnInit {

  newTodo: Todo = new Todo();
  counter = 0;
 constructor(private auth: AuthService, private state: StateService,
  private todoDataService: TodoDataService, private router: Router, private alerts: AlertsService) {}

  ngOnInit() {
   if (this.auth.isLoggedOut()) {
    this.alerts.setMessage('Please login to access the app', 'error');
     this.navigate();
   } else {
    this.todoDataService.retrieveAllTodos();
    this.state.changeMessage(true);
   }
   this.listner();
 }

 listner = () => {
  this.state.currentMessage.subscribe((message: Boolean) => {
    this.counter++;
    if (message === true && this.counter === 1) {
      this.todoDataService.retrieveAllTodos();
    }
  });
}

navigate = () => {
    this.router.navigate(['login']).then(nav => {
    console.log(nav);
  }).catch(err => {
   console.log(err);
  });
}

  addTodo() {
    this.newTodo.complete = false;
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
   return this.todoDataService.getAllTodos();
  }

  saveTodos = () => {
    this.todoDataService.storeAllTodos();
  }
}
