import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../service/todo/todo.service';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { List } from '../../interface/List.interface';
import { Category } from '../../interface/Category.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule, Divider, ChipModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categoryObservable!: Subscription;

  category!: Category; // Assuming you have a List interface defined somewhere
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService, // Assuming you have a TodoService to fetch data
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryUuid = params['id'];
      
      this.categoryObservable = this.todoService.getCategory(categoryUuid).subscribe(category => {
        this.category = category; // Assuming you have a List interface defined somewhere
        console.log(this.category); // Do something with the fetched category data
      });

    
    });
  }

}

