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
import { FormsModule }    from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Todo } from '../../interface/Todo.interface';



@Component({
  selector: 'app-list',
  imports: [CommonModule,  TagModule, Divider, ChipModule, CheckboxModule,FormsModule, RouterModule, InputTextModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  list!: List;
  categoryId!: string;
  listObserveble!: Subscription;
  newTodo: Todo = { uuid: '', title: '', completed: false };

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService, // Assuming you have a TodoService to fetch data
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const listUuid = params['id'];
      this.categoryId = params['categoryId'];
      this.listObserveble = this.todoService.getList(listUuid).subscribe(list => {
        this.list = list; // Assuming you have a List interface defined somewhere
        console.log(this.list); // Do something with the fetched category data
      });
    });
  }

  toggleDone(todo: any) {
    todo.completed = !todo.completed;
  }

  addTodo() {
    this.list.todos.push({ uuid: self.crypto.randomUUID(), title: 'adasd', completed: false });
  }

}
