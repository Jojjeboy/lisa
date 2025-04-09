import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../interface/Todo.interface';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { Data } from '../../interface/Data.interface';
import { Category } from '../../interface/Category.interface';
import { List } from '../../interface/List.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(private localStorageService: LocalstorageService) {
    this.localStorageService = localStorageService;

  }


  getData(): Data {
    return this.localStorageService.getData();
  }


  getCategories(): Category[] {
    return this.localStorageService.getCategories();
  }

  getCategory(categoryUUId: string): Category {
    return this.localStorageService.getCategory(categoryUUId);
  }

  getLists(categoryUUId: string): List[] {
    return this.localStorageService.getLists(categoryUUId);
  }

  getList(listUuid: string): List {
    return this.localStorageService.getList(listUuid);
  }

  addTodo(Todo: Todo): void {
    // 1. Ta emot Todo objektet och gör till sträng 
    const todosString = JSON.stringify(Todo);
    // 2. Spara i local storage
    // 3. returnera att det är sparat
    this.localStorageService.addTodo(todosString);

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
