import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../interface/Todo.interface';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { Data } from '../../interface/Data.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(private localStorageService: LocalstorageService) {
    this.localStorageService = localStorageService;

  }


  getAllData(): Data {
    return this.localStorageService.getData();
  }

/*
  getTodoList(uuid: string): Todo[] | null {
    return this.localStorageService.getTodoList(uuid);
  }
*/
  /*
  addTodo(todo: Todo) {
    //this.localStorageService.saveTodo(todo);
  }

  */

  updateTodo(todo: Todo) {

  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateTodo(todo);
  }


}
