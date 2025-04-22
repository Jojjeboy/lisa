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


  persistenceKey = 'lisa'; // key for local storage


  constructor(private localStorageService: LocalstorageService) {
    this.localStorageService = localStorageService;

  }




  getData(): Observable<Data> {
    return new Observable<Data>(observer => {
      const data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      observer.next(data);
      observer.complete();
    });
  }


  setData(data: Data): Observable<void> {
    return new Observable<void>(observer => {

      // 1. Spara i local storage
      this.localStorageService.setData(JSON.stringify(data), this.persistenceKey);

      observer.next();
      observer.complete();
    });
  }


  getCategories(): Observable<any> {
    return new Observable<any>(observer => {
      const categories = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories;
      if (!categories) {
        observer.error(new Error('No categories found'));
      }
      observer.next(categories);
      observer.complete();
    })
  }

  getCategory(categoryUUId: string): Observable<Category> {
    return new Observable<Category>(observer => {
      const category = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories.find((category: Category) => category.uuid === categoryUUId);
      if (!category) {
        observer.error(new Error('Category not found'));
      }
      observer.next(category);
      observer.complete();
    })
  }

  getLists(categoryUUId: string): Observable<List[]> {
    return new Observable<List[]>(observer => {
      const lists = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories.find((category: Category) => category.uuid === categoryUUId)?.lists;
      if (!lists) {
        observer.error(new Error('No lists found'));
      }
      observer.next(lists);
      observer.complete();
    })
  }

  getList(listUuid: string): Observable<List> {
    return new Observable<List>(observer => {
      const list = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories.flatMap((category: Category) => category.lists).find((list: List) => list.uuid === listUuid);
      if (!list) {
        observer.error(new Error('List not found'));
      }
      observer.next(list);
      observer.complete();
    });
  }




  addTodo(Todo: Todo): void {
    // 1. Ta emot Todo objektet och gör till sträng 
    const todosString = JSON.stringify(Todo);
    // 2. Spara i local storage
    // 3. returnera att det är sparat
    //this.localStorageService.addTodo(todosString);

  }


  updateList(listToSave: List): Observable<void> {
    let data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
    if (!data) {
      throw new Error('List not found');
    }
    else {
      return new Observable<void>(observer => {
        data.categories.forEach((category: Category) => {
          category.lists.forEach((listItem: List) => {
            if (listItem.uuid === listToSave.uuid) {
              listItem.color = listToSave.color; // Update the list with the new data
              listItem.description = listToSave.description; // Update the list with the new data
              listItem.title = listToSave.title; // Update the list with the new data
              listItem.todos = listToSave.todos; // Update the list with the new data
              listItem.lastTouched = new Date(); // Update the last touched date
            }
          });
        });
        this.localStorageService.setData(JSON.stringify(data), this.persistenceKey); // Save the updated data to local storage
        observer.next();
        observer.complete();
      });
    }
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




}
