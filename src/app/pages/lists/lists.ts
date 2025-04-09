import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Divider } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TodoService } from '../../service/todo/todo.service';
import { Todo } from '../../interface/Todo.interface';
import { ChipModule } from 'primeng/chip';
import { Data } from '../../interface/Data.interface';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-lists',
    standalone: true,
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule, Divider, ChipModule, RouterModule],
    templateUrl: './lists.component.html',  
    providers: [TodoService]
})
export class Lists {
    data!: Data;

    constructor(private todoService: TodoService) { }
    ngOnInit() {
        this.data = this.todoService.getData();
    }
}
