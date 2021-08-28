import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppComponent } from './books/book-app/book-app.component';

const routes: Routes = [{ path: 'books', component: BookAppComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
