import { Injectable } from '@angular/core';
import {Todo} from '../classes/todo';
import axios from 'axios';

@Injectable()
export class TodoDataService {
  // to simulate automatic increment of id's
  lastId: number;
  // Place holder for todos
  todos: Todo[];

  constructor() {
    this.lastId = 0;
    this.todos = [];
  }

  // Simulate POST /todos

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }
  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  // store all todos
    storeAllTodos = (): void => {
      const payload = {
      todos : this.todos
     };

    const token = localStorage.getItem('id_token');

    axios.post('http://localhost:8080/services/storeTodos', payload,  {
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
   }).then(response => {
       if (response.status === 200) {
         alert('Todo list saved');
        } else {
          alert(response.data.message);
        }
     }).catch(err => {
        alert('Unauthorised api access - Invalid Token - ' + err);
     });
   }

   // retireve all todos from db
    retrieveAllTodos = () => {

     const token = localStorage.getItem('id_token');

     axios.get('http://localhost:8080/services/getTodos', {
       headers: {'Authorization': `Bearer ${token}`}
      }).then(response => {
      if (response.status === 200) {
        // alert(JSON.stringify(response.data));
        if (response.data.todos.length !== 0) {
            this.lastId = response.data.todos[response.data.todos.length - 1].id;
            console.log(this.lastId);
            this.todos = response.data.todos;
         }
      } else {
        alert(response.data.message);
      }
     }).catch(err => {
      alert('Unauthorised api access - Invalid Token - ' +  err);
     });
   }
}
