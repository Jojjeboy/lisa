import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';

export default [
    { path: 'crud', component: Crud },
    { path: 'documentation', component: Documentation },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
