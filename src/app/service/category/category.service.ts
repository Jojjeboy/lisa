import { Injectable } from '@angular/core';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { Category } from '../../interface/Category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  persistenceKey = 'lisa'; // key for local storage

  constructor(private localStorageService: LocalstorageService) { }


  upCategory(categoryUuid: string): void {

    // 1. Hämta alla categorier
    let categories = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories;
    // 2. Hämta kategorin du vill uppa ordningen på
    let category2 = categories.find((category: Category) => category.uuid === categoryUuid);
    if (!category2) {
      throw new Error('Category not found');
    }

    // 3. Hämta kategorin som ligger precis efter den kategorin
    let category1 = categories.find((category: Category) => category.order === category2.order - 1);

    // Byt ordning på kategorierna
    if (category1) {
      let tempOrder = category2.order;
      category2.order = category1.order;
      category1.order = tempOrder;
    } else {
      throw new Error('No next category found');
    }
    

    this.localStorageService.setData(this.persistenceKey, JSON.stringify({ categories }));
  }



  downCategory(categoryUuid: string): void {
    // 1. Hämta alla categorier
    let categories = JSON.parse(this.localStorageService.getData(this.persistenceKey)).categories;
    // 2. Hämta kategorin du vill uppa ordningen på
    let category2 = categories.find((category: Category) => category.uuid === categoryUuid);
    if (!category2) {
      throw new Error('Category not found');
    }

    // 3. Hämta kategorin som ligger precis efter den kategorin
    let category1 = categories.find((category: Category) => category.order === category2.order + 1);

    // Byt ordning på kategorierna
    if (category1) {
      let tempOrder = category2.order;
      category2.order = category1.order;
      category1.order = tempOrder;
    } else {
      throw new Error('No next category found');
    }
    

    this.localStorageService.setData(this.persistenceKey, JSON.stringify({ categories }));
  }
}
