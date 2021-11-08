import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BtnShakeComponent } from './btn-shake/btn-shake.component';
import { StaggerInComponent } from './stagger-in/stagger-in.component';

const routes: Routes = [
  {
    path: 'btn-shake',
    component: BtnShakeComponent,
    data: { animation: 'btn-shake' },
  },
  {
    path: 'router-animation',
    loadChildren: () =>
      import('./router-animation/router-animation.module').then(
        (m) => m.RouterAnimationModule
      ),
  },
  {
    path: 'stagger-in',
    component: StaggerInComponent,
    data: { animation: 'stagger-in' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
