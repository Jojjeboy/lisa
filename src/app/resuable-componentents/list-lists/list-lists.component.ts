import { Component, Input } from '@angular/core';
import { Category } from '../../interface/Category.interface';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-lists',
  imports: [
    CommonModule,
    ChipModule,
    RouterModule],
  templateUrl: './list-lists.component.html',
  styleUrl: './list-lists.component.scss'
})
export class ListListsComponent {

  @Input() category!: Category;
}
