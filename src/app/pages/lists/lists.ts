import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Divider } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TodoService } from '../../service/todo/todo.service';
import { ChipModule } from 'primeng/chip';
import { Data } from '../../interface/Data.interface';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-lists',
    standalone: true,
    imports: [CommonModule, TagModule, Divider, ChipModule, RouterModule],
    templateUrl: './lists.component.html',  
    providers: [TodoService]
})
export class Lists implements OnInit {
    data!: Data;
    dataObserveble!: Subscription;

    constructor(private todoService: TodoService) { }
    ngOnInit() {
        this.dataObserveble = this.todoService.getData().subscribe(data => {
            this.data = data; // Assuming you have a List interface defined somewhere
            console.log(this.data); // Do something with the fetched category data
          });
    }
}
