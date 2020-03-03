import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';


export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', redirectTo: 'tables' },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' }
    ]
}];
