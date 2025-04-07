import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../interface/Todo.interface';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(private localStorageService: LocalstorageService) {
    this.localStorageService = localStorageService;

  }


  getTodos(): any[] {
    return this.localStorageService.getTodos();
  }

  addTodo(todo: Todo) {
    this.localStorageService.saveTodo(todo);
  }

  updateTodo(todo: Todo) {

  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateTodo(todo);
  }


}
