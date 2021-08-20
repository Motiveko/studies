import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "directives", loadChildren: () => import('./directives/directives.module').then(m => m.DirectivesModule)},
  {path: "dynamic-component-loader", loadChildren: () => import('./dynamic-component-loader/dynamic-component-loader.module').then(m => m.DynamicComponentLoaderModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
