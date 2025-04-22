import { Component, OnInit } from '@angular/core';
import { List } from '../../interface/List.interface';
import { Subscription } from 'rxjs';
import { TodoService } from '../../service/todo/todo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Divider } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Todo } from '../../interface/Todo.interface';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    TagModule,
    Divider,
    ChipModule,
    CheckboxModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})
export class ListComponent implements OnInit {

  


  list!: List;
  categoryId!: string;
  listObserveble!: Subscription;
  newTodo: Todo = { uuid: '', title: '', completed: false };
  todoForm: any; // FormGroup for the todo form
  todoOriginalTitle!: string; // FormGroup for the todo form
  displayPosition: boolean = false;
  position!: string;
  visible: boolean = false;
  todo: Todo = { uuid: '', title: '', completed: false };
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const listUuid = params['id'];
      this.categoryId = params['categoryId'];
      this.list = this.getList(listUuid); // Fetch the list using the UUID from the route params
    });
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });
  }




  getList(listUuid: string): List {
    this.listObserveble = this.todoService.getList(listUuid).subscribe(list => {
      this.list = list; // Assuming you have a List interface defined somewhere
    });
    return this.list;
  }



  toggleDone() {
    this.saveTodo();
  }

  addTodo() {
    this.list.todos.push(
      {
        uuid: self.crypto.randomUUID(),
        title: this.todoForm.value.title,
        completed: false
      }
    );
    this.saveTodo();
  }


  saveTodo() {
    this.list.lastTouched = new Date(); // Update the last touched date
    this.todoService.updateList(this.list).subscribe(() => {
      console.log('Todo updated successfully!');
    }, error => {
      console.error('Error updating todo:', error);
    });
    this.todoForm.reset();
  }


  clear() {
    this.todoForm.reset(); // Clear the form
    this.list.todos.forEach(todo => {
      todo.completed = false; // Set all todos to not completed
    });
    
    this.saveTodo(); // Save the updated list to local storage
  }

  deleteTodo(todo: Todo) {
    this.list.todos = this.list.todos.filter(t => t.uuid !== todo.uuid);
    this.visible = false;
    this.saveTodo();
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }


  showDialog(todo: Todo) {
    this.todo = todo;
    this.todoOriginalTitle = todo.title;
    this.visible = true;
  }


  updateTodo(todo: Todo) {
    const index = this.list.todos.findIndex(t => t.uuid === this.todo.uuid);
    if (index !== -1) {
      this.list.todos[index] = { ...this.todo };
      this.saveTodo();
    }
    this.visible = false;
  }


  discard() {
    this.visible = false;
    this.todo.title = this.todoOriginalTitle;
  }

  shouldBeDisabled() {
    for (const todo of this.list.todos) {
      if (todo.completed) {
        return false;
      }
    }
    return true;
  }



  ngOnDestroy() {
    if (this.listObserveble) {
      this.listObserveble.unsubscribe();
    }
  }


}
