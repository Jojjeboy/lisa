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
import { AccordionModule } from 'primeng/accordion';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmDialogComponent } from '../../resuable-componentents/confirm-dialog/confirm-dialog.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MiscService } from '../../service/misc/misc.service';
import { TreeModule } from 'primeng/tree';



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
    DialogModule,
    AccordionModule,
    FloatLabelModule, 
    ConfirmDialogComponent,
    ToggleSwitchModule,
    TreeModule
  ],
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
  listForm: any; // FormGroup for the list form
  todoOriginalTitle!: string; // FormGroup for the todo form
  originalList!: List; 
  displayPosition: boolean = false;
  position!: string;
  editTodoDialogvisible: boolean = false;
  listEditDialogvisible: boolean = false;
  todo: Todo = { uuid: '', title: '', completed: false };
  categoryColor: string = '#000000';
  todoMinLength: number = 3; // Maximum length for the todo title
  todoMaxLength: number = 25; // Maximum length for the todo title



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private todoService: TodoService,
    private miscService: MiscService,
    private router: Router // Assuming you have a TodoService to fetch data
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const listUuid = params['id'];
      this.categoryId = params['categoryId'];
      this.list = this.getList(listUuid); // Fetch the list using the UUID from the route params
      this.todoService.getCategoryColor(this.categoryId).subscribe(color => {
        this.categoryColor = color; // Assuming you have a method to get the category color 
      });
    });

    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(this.todoMinLength), Validators.maxLength(this.todoMaxLength)]],
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
        uuid: this.miscService.generateUuid(),
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
    this.editTodoDialogvisible = false;
    this.saveTodo();
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }


  showEditTodoDialog(todo: Todo) {
    this.todo = {...todo};
    this.todoOriginalTitle = todo.title;
    this.editTodoDialogvisible = true;
  }


  showEditListDialog() {
    this.originalList = {...this.list};
    this.listEditDialogvisible = true;
  }


  updateTodo(todo: Todo) {
    const index = this.list.todos.findIndex(t => t.uuid === this.todo.uuid);
    if (index !== -1) {
      this.list.todos[index] = { ...this.todo };
      this.saveTodo();
    }
    this.editTodoDialogvisible = false;
  }

  updateList() {
    this.todoService.updateList(this.list).subscribe(() => {
      console.log('List updated successfully!');
      this.listEditDialogvisible = false;
    }, error => {
      console.error('Error updating list:', error);
    });
  }


  discardTodoEdit() {
    this.editTodoDialogvisible = false;
    this.todo.title = this.todoOriginalTitle;
  }

  discardListEdit() {
    this.list = this.originalList;
    this.listEditDialogvisible = false;
  }

  shouldBeDisabled() {
    for (const todo of this.list.todos) {
      if (todo.completed) {
        return false;
      }
    }
    return true;
  }

  deleteList() {
    this.todoService.deleteList(this.list.uuid).subscribe(() => {
      console.log('List deleted successfully!');
    });

    this.router.navigate(['/category', this.categoryId]);
  }




  ngOnDestroy() {
    if (this.listObserveble) {
      this.listObserveble.unsubscribe();
    }
  }


}
