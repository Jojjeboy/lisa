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

  /**
   * 
   * @returns Data
   */
  getData(): Observable<Data> {
    return new Observable<Data>(observer => {
      const data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      observer.next(data);
      observer.complete();
    });
  }

  /**
   * 
   * @param data Data
   * @returns void
   */
  setData(data: Data): Observable<void> {
    return new Observable<void>(observer => {

      // 1. Spara i local storage
      this.localStorageService.setData(this.persistenceKey, JSON.stringify(data));

      observer.next();
      observer.complete();
    });
  }

  /**
   * 
   * @param list List
   * @returns void
   */
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

  /**
   * 
   * @param categoryUUId string
   * @returns Category
   */
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

  /**
   * 
   * @param categoryUUId string
   * @returns List[]
   */
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

  /**
   * 
   * @param listUuid string
   * @returns List
   */
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

  /**
   * 
   * @param listToSave List
   * @returns void
   */
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
              listItem.description = listToSave.description; // Update the list with the new data
              listItem.title = listToSave.title; // Update the list with the new data
              listItem.todos = listToSave.todos; // Update the list with the new data
              listItem.lastTouched = new Date(); // Update the last touched date
            }
          });
        });
        this.localStorageService.setData(this.persistenceKey, JSON.stringify(data)); // Save the updated data to local storage
        observer.next();
        observer.complete();
      });
    }
  }


  /**
   * 
   * @param list List
   * @param categoryUuid string
   * @returns void
   */
  addList(list: List, categoryUuid: string): Observable<void> {
    return new Observable<void>(observer => {
      let data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      if (!data) {
        throw new Error('No data found');
      }
      else {
        data.categories.forEach((category: Category) => {
          if (category.uuid === categoryUuid) {
            category.lists.push(list); // Add the new list to the category
          }
        });
        this.localStorageService.setData(this.persistenceKey, JSON.stringify(data)); // Save the updated data to local storage
        observer.next();
        observer.complete();
      }
    });
  }

  /**
   * 
   * @param category Category
   * @returns void
   */
  addCategory(category: Category): Observable<void> {
    return new Observable<void>(observer => {
      let data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      if (!data) {
        throw new Error('No data found');
      }
      else {
        data.categories.push(category); // Add the new category to the data
        this.localStorageService.setData(this.persistenceKey, JSON.stringify(data)); // Save the updated data to local storage
        observer.next();
        observer.complete();
      }
    })
  }

  updateCategory(category: Category): Observable<void> {
    return new Observable<void>(observer => {

      let data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      if (!data) {
        throw new Error('No data found');
      } else {
        data.categories.forEach((cat: Category) => {
          if (cat.uuid === category.uuid) {
            cat.title = category.title;
          }
        });
        this.localStorageService.setData(this.persistenceKey,JSON.stringify(data));
        observer.next();
        observer.complete();
      }
    });
  }

  deleteList(listUuid:  string): Observable<void> {
    return new Observable<void>(observer => {
      let data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      if (!data) {
        throw new Error('No data found');
      }
      else {
        data.categories.forEach((category: Category) => {
          category.lists = category.lists.filter((list: List) => list.uuid !== listUuid); // Remove the list from the category
        });
        this.localStorageService.setData(this.persistenceKey, JSON.stringify(data)); // Save the updated data to local storage
        observer.next();
        observer.complete();
      }
    });
  }

  /**
   * 
   * @param categoryUuid string
   * @returns void
   */
  deleteCategory(categoryUuid: string): Observable<void> {
    return new Observable<void>(observer => {
      let data = JSON.parse(this.localStorageService.getData(this.persistenceKey));
      if (!data) {
        throw new Error('No data found');
      }
      else {
        data.categories = data.categories.filter((category: Category) => category.uuid !== categoryUuid); // Remove the category from the data
        this.localStorageService.setData(this.persistenceKey, JSON.stringify(data)); // Save the updated data to local storage
        observer.next();
        observer.complete();
      }
    });
  }

  getCategoryColor(categoryUuid: string): Observable<string> {
    return new Observable<string>(observer => {
      const category = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories.find((category: Category) => category.uuid === categoryUuid);
      if (!category) {
        observer.error(new Error('Category not found'));
      }
      observer.next(category.color);
      observer.complete();
    });
  }

}
