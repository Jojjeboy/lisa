import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../interface/Category.interface';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { List } from '../../interface/List.interface';
import { Todo } from '../../interface/Todo.interface';

@Component({
  selector: 'app-list-lists',
  imports: [
    CommonModule,
    ChipModule,
    RouterModule,
    ButtonModule,
    Divider
  ],
  templateUrl: './list-lists.component.html',
  styleUrl: './list-lists.component.scss'
})
export class ListListsComponent implements OnInit {
  @Input() category!: Category;
  @Output() showAddListDialog = new EventEmitter<void>();

  categoryColor: string = '#000000';

  ngOnInit(): void {
    // Initialize the category color when the component is initialized
    this.categoryColor = this.category.color;
  }

  inputFunction(categoryUuid: string) {
    // Emit the event to show the add list dialog
    this.showAddListDialog.emit();
  }


  nrOfDone(todos: Todo[]) {
    // Calculate the number of done items in the category
    return todos.filter(item => item.completed).length;
  }
}