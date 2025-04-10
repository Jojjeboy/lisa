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


  getData(): Observable<Data>{
    return new Observable<Data>(observer => {
      const data =this.localStorageService.getData();
      observer.next(data);
      observer.complete();
    })
  }


  getCategories(): Observable<Category[]> {
    return new Observable<Category[]>(observer => {
      const categories = this.localStorageService.getCategories();
      observer.next(categories);
      observer.complete();
    })
    //return this.localStorageService.getCategories();
  }

  getCategory(categoryUUId: string): Observable<Category> {
    return new Observable<Category>(observer => {
      const category = this.localStorageService.getCategory(categoryUUId);
      observer.next(category);
      observer.complete();
    })
  }

  getLists(categoryUUId: string): Observable<List[]> {
    return new Observable<List[]>(observer => {
    const lists = this.localStorageService.getLists(categoryUUId);
      observer.next(lists);
      observer.complete();
    })
  }

  getList(listUuid: string): Observable<List>{
    return new Observable<List>(observer => {
      const list = this.localStorageService.getList(listUuid);
      observer.next(list);
      observer.complete();
    });
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
