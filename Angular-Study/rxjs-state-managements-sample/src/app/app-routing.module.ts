import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./modules/todo/todo.module').then((m) => m.TodoModule),
  },
  {
    path: 'counter',
    loadChildren: () => import('./modules/counter/counter.module').then((m) => m.CounterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
