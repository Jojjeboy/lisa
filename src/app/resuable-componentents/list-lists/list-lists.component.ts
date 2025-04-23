import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../interface/Category.interface';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';

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
export class ListListsComponent {

  @Input() category!: Category;
  @Output() showAddListDialog = new EventEmitter<void>();

  inputFunction(categoryUuid: string) {
    this.showAddListDialog.emit();
  }
}
