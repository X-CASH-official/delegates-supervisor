import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { delegatesComponent } from './delegates/delegates.component';

const materialWidgetRoutes: Routes = [
        { path: '', component: delegatesComponent , data: { animation: 'fixed' }}
];

@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class TablesRouterModule {}