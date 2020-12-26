import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { AuthComponent } from '../auth/auth.component';


const routes: Routes = [
        {  path: '', component: AuthComponent, children: [
            { path: 'dashboard', loadChildren: '../tables/tables.module#TablesModule' },
            { path: '**', redirectTo: 'dashboard'},
            ]
          },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
