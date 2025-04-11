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
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Todo } from '../../interface/Todo.interface';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, Validators } from '@angular/forms';



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
    ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})
export class ListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private todoService: TodoService
  ) {}


  list!: List;
  categoryId!: string;
  listObserveble!: Subscription;
  newTodo: Todo = { uuid: '', title: '', completed: false };
  todoForm: any; // FormGroup for the todo form


  
  

  

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



  toggleDone(todo: any) {
    todo.completed = !todo.completed;
  }

  addTodo() {
    this.list.todos.push(
      { 
        uuid: self.crypto.randomUUID(), 
        title: this.todoForm.value.title,
        completed: false }
      );
    this.saveTodo();
  }


  saveTodo() {
    this.todoService.updateList(this.list).subscribe(() => {
      console.log('Todo updated successfully!');
    }, error => {
      console.error('Error updating todo:', error);
    });
  } 



  ngOnDestroy() {
    if (this.listObserveble) {
      this.listObserveble.unsubscribe();
    }
  }


}
