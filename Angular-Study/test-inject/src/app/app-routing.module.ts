import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    children:[
      { path: 'child', loadChildren: () => import('./child/child.module').then(m => m.ChildModule)},
      { path: 'lazy', loadChildren: () => import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule )}
    ]
  },
  { path: 'customers', loadChildren: () => import('./lazy-loading/customers/customers.module').then(m => m.CustomersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
