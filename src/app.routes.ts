import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
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
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation }
        ]
    },

    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
