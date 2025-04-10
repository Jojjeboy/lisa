import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component';

export default [
    { path: 'crud', component: Crud },
    { path: 'documentation', component: Documentation },
    { path: 'lists', component: ListsComponent },
    { path: 'lists/list/:id/:categoryId', component: ListComponent },
    { path: 'category/:id', component: CategoryComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
