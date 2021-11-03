import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BtnShakeComponent } from './btn-shake/btn-shake.component';

const routes: Routes = [{ path: 'btn-shake', component: BtnShakeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
