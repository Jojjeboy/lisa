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
import { Product, ProductService } from '../service/product.service';
import { TodoService } from '../../service/todo/todo.service';
import { Todo } from '../../interface/Todo.interface';
import { ChipModule } from 'primeng/chip';


@Component({
    selector: 'app-lists',
    standalone: true,
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule, Divider, ChipModule],
    templateUrl: './lists.component.html',
    styles: `
        
    `,
    providers: [ProductService]
})
export class Lists {
    layout: 'list' | 'grid' = 'list';
    options = ['list', 'grid'];
    products: Product[] = [];
    sourceCities: any[] = [];
    targetCities: any[] = [];
    orderCities: any[] = [];
    todos: any;
    constructor(private productService: ProductService, private todoService: TodoService) { }
    ngOnInit() {
        this.productService.getProductsSmall().then((data) => (this.products = data.slice(0, 6)));
        this.todos = this.todoService.getTodos();
    }
}
