import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
 
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [   
    {path: 'auth', loadChildren: '../auth/auth.module#AuthModule'},
    {path: '**', redirectTo: 'auth/dashboard'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
