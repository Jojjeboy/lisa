import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../../interface/Todo.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  todos: Todo[] = [];
  todo!: Todo

  // hold current Todos from storage
  private TodoSubject = new BehaviorSubject<Todo[]>(this.getTodos())
  todo$ = this.TodoSubject.asObservable() // expose as observable


  // sending Todo to edit to to do form
  // defaults to null
  private editSubject = new BehaviorSubject<Todo | null>(null)
  edit$ = this.editSubject.asObservable()

  // add new Todo to existing Todo array
  // add updated Todos to local storage
  saveTodo(newTodo: Todo) {
    this.todos = [ // add new Todo to existing Todo array
      ...this.getTodos(),
      newTodo
    ]
    localStorage.setItem('Todos', JSON.stringify(this.todos))
    this.TodoSubject.next(this.todos) // notify all subscribers of new Todo array
  }

  /************************************************************************ */

  /**
   * 
   * @returns Todo[]
   */
  // get Todos from Json file

  getTodosFromJson(): any {

    return [
      {
        categories: [
          {
            uuid: 'd1f770f9-6703-413d-8d16-56b977e2e9f9',
            title: 'Packning jobb',
            'lists': [
              {
                uuid: 'd0b2f747-af29-41eb-a78d-c02abd724342',
                title: 'Packa Regionens hus',
                color: '#FF5733',
                todos: [
                  {
                    title: 'SITHS-kort',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: false,
                    dueDate: null
                  },
                  {
                    title: 'Glasögon',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: null
                  }
                ]
              },
              {
                uuid: 'db77e75a-f00c-488c-8780-5ab36b6b240f',
                title: 'Packa Mölndalskontoret',
                color: '#FF5733',
                todos: [
                  {
                    title: 'Glasögon',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: false,
                    dueDate: '2025-09-02T12:00:00Z'
                  },
                  {
                    title: 'SITHS-kort',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: null
                  },
                  {
                    title: 'Matlåda',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: '2025-09-04T12:00:00Z'
                  },
                  {
                    title: 'Leave stuff at the office',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: null
                  }
                ]
              }
            ]
          },
          {
            uuid: '613964d7-2977-47df-8bd8-d262b529e4dc',
            'name': 'Städning',
            'lists': [
              {
                uuid: 'd0b2f747-af29-41eb-a78d-c02abd724342',
                title: 'Städa toa',
                color: '#FF5733',
                todos: [
                  {
                    title: 'Rengör toastolen',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: false,
                    dueDate: '2025-10-01T12:00:00Z'
                  },
                  {
                    title: 'Rengör handfatet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: '2025-10-02T12:00:00Z'
                  }
                ]
              },
              {
                uuid: 'db77e75a-f00c-488c-8780-5ab36b6b240f',
                title: 'Städa köket',
                color: '#FF5733',
                todos: [
                  {
                    title: 'Släng soporna',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: false,
                    dueDate: '2025-09-02T12:00:00Z'
                  },
                  {
                    title: 'Gå med återvinningen',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: null
                  },
                  {
                    title: 'Torka av ytorna',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: '2025-09-04T12:00:00Z'
                  },
                  {
                    title: 'Töm och fyll diskmaskinen',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    completed: true,
                    dueDate: null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

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


  // get Todos from local storage
  getTodos(): Todo[] {
    const TodosString = localStorage.getItem('todos')
    if (TodosString)
      this.todos = JSON.parse(TodosString)
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

  // send Todo to edit
  selectEditTodo(editTodo: Todo) {
    this.editSubject.next(editTodo) // notify all subscribers of new edit Todo
  }

  // clear local storage
  clearTodos(): void {
    localStorage.clear()
  }

}
