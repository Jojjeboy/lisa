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


  data!: Data;
  categories!: Category[];
  category!: Category;
  todos: Todo[] = [];
  list!: List;// hold current List from storage

  // hold current Todos from storage
  //private CateogrySubject = new BehaviorSubject<Category>(this.getCategories())
  //categories$ = this.CateogrySubject.asObservable() // expose as observable


  // sending Todo to edit to to do form
  // defaults to null
  private editSubject = new BehaviorSubject<Todo | null>(null)
  edit$ = this.editSubject.asObservable()

  /*
  // add new Todo to existing Todo array
  // add updated Todos to local storage
  saveTodo(newTodo: Todo) {
    this.todos = [ // add new Todo to existing Todo array
      ...this.getAllTodoLists(),
      newTodo
    ]
    localStorage.setItem('Todos', JSON.stringify(this.todos))
    this.TodoSubject.next(this.todos) // notify all subscribers of new Todo array
  }
*/
  /************************************************************************ */



  /**
   * 
   * @returns void
   */
  // Set Todos to local storage
  setTodosToLocalStorage(todos: Todo[]): void {
    this.todos = todos // set Todos to local storage
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }


  /************************************************************************ */

    /**
     * 
     * @returns Data
     */
    getData(): Data {
      const data = localStorage.getItem('lisa')
      if (data){
        this.data = JSON.parse(data);  
        this.categories = this.data.categories; // set categories to the ones in local storage      
      }
      return this.data;
    }


    /******************** CATEGORY *********************/


    /**
     * 
     * @returns Category[]
     */
    getCategories(): Category[] {
      let data:any = localStorage.getItem('lisa')
      if (data){
        data = JSON.parse(data);
        this.categories = data.categories;
      }
      return this.categories;
    }


    /**
     * 
     * @param categoryUUId 
     * @returns Category
     */
    getCategory(categoryUUId: string): Category {
      this.data.categories.forEach(category => {
        if(category.uuid === categoryUUId){
          console.log(category);
          this.category = category; // set current category to the one with the same uuid
        }
      });
      return this.category;
    }


    /*****************************************/


    /******************** list *********************/


    /**
     * 
     * @param categoryUUId
     * @returns List[]
     */
    getLists(categoryUUId: string): List[] {
      for (const category of this.categories) {
        if (category.uuid === categoryUUId) {
          return category.lists; // set current category to the one with the same uuid
        }
      }
      return [];
    }


    /**
     * 
     * @param categoryUUId 
     * @returns List
     */
    getList(listUuid: string): List {
      for (const category of this.categories) {
        for (const list of category.lists) {
          if (list.uuid === listUuid) {
            return list; // set current list to the one with the same uuid
          }
        }
      }
      return null as any; // Return null or an appropriate default value
    }


    /*****************************************/
    


    /*
  // get Todos from local storage
  getAllTodoLists(): List<Todo>[] {
    const TodosString = localStorage.getItem('lisa')
    if (TodosString){
      this.todos = JSON.parse(TodosString);
      
      let n = 0;
      //this.list = this.todos.filter(t => t.uuid !== null) // filter Todos to get only the Todo with the same uuid
    }
    return this.todos
  }

  */

  /*
  // get Todos from local storage
  getTodoList(uuid :string): Todo[] {
    const TodosString = localStorage.getItem('lisa');
    if (TodosString){
      this.todos = JSON.parse(TodosString);
      
      this.todos = this.todos.filter(t => t.uuid === uuid) // filter Todos to get only the Todo with the same uuid
    }
    return this.todos
  }
  // delete one Todo from existing list
  deleteTodo(TodoToDelete: Todo) {
    this.todos = this.todos.filter( // filter existing Todo array to remove the Todo
    t =>
    !(t.description === TodoToDelete.description && // sets condition: if all properties match received Todo, exclude it
    t.uuid === TodoToDelete.uuid &&
    t.dueDate === TodoToDelete.dueDate)
  )
  localStorage.setItem('Todos', JSON.stringify(this.todos)) // set filtered Todos in local storage
  this.TodoSubject.next(this.todos) // notify all subscribers of new Todo array
}
*/

  // send Todo to edit
  selectEditTodo(editTodo: Todo) {
    this.editSubject.next(editTodo) // notify all subscribers of new edit Todo
  }

  // clear local storage
  clearTodos(): void {
    localStorage.clear()
  }

}
