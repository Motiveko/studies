import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { counterReducer } from './state/counter/counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { booksReducer } from './state/books/books.reducer';
import { collectionReducer } from './state/books/collection.reducer';
import { BookCollectionComponent } from './books/book-collection/book-collection.component';
import { BookAppComponent } from './books/book-app/book-app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    BookListComponent,
    BookCollectionComponent,
    BookAppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {
        count: counterReducer,
        books: booksReducer,
        collection: collectionReducer,
      },
      {}
    ),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
