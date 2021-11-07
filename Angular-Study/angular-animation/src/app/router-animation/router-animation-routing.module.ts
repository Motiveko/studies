import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { WrapperComponent } from './wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: '', redirectTo: 'component1', pathMatch: 'full' },
      {
        path: 'component1',
        component: Component1Component,
        data: { animation: 'component1' },
      },
      {
        path: 'component2',
        component: Component2Component,
        data: { animation: 'component2' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouterAnimationRoutingModule {}
