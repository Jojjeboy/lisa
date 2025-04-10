import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TodoService } from '../../service/todo/todo.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Divider } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { Category } from '../../interface/Category.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [CommonModule,  TagModule, Divider, ChipModule, RouterModule],
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

