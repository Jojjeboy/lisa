import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { ListComponent } from './app/pages/list/list.component';
import { StartComponent } from './app/pages/start/start.component';
import { CategoryComponent } from './app/pages/category/category.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: StartComponent },
            { path: 'category/:id', component: CategoryComponent },
            { path: 'list/:id/:categoryId', component: ListComponent },
        ]
    },

    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
