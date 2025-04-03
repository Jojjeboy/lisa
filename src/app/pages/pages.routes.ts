import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Lists } from './lists/lists';

export default [
    { path: 'crud', component: Crud },
    { path: 'documentation', component: Documentation },
    { path: 'lists', component: Lists },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
