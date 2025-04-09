import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Lists } from './lists/lists';
import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component';

export default [
    { path: 'crud', component: Crud },
    { path: 'documentation', component: Documentation },
    { path: 'lists', component: Lists },
    { path: 'lists/list/:id', component: ListComponent },
    { path: 'category/:id', component: CategoryComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
