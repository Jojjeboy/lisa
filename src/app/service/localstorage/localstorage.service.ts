import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from '../../interface/List.interface';
import { Todo } from '../../interface/Todo.interface';
import { Data } from '../../interface/Data.interface';
import { Category } from '../../interface/Category.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {



    /**
     * 
     * @returns Data
     */
    getData(key: string): string {
      const data = localStorage.getItem(key) // use the key parameter
      if (data){
        return data; // set categories to the ones in local storage      
      }
      else {
        return JSON.stringify({categories: [] }); // return object if not found
      }
    }


    /**
     * 
     * @param data: string 
     * @returns void
     */
    setData(key: string, data: string,): void { 
      localStorage.setItem(key, data); // set data to local storage
    }



    /**
     * 
     * @param key: string 
     * @returns void
     */

    clearData(key: string): void {
      localStorage.removeItem(key); // remove data from local storage
    }

    /**
     * 
     * @param key: string 
     * @returns void
     */
    clearAllData(): void {
      localStorage.clear(); // clear all data from local storage
    }

}
