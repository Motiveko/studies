import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectBookCollection,
  selectBooks,
} from 'src/app/state/books/book.selector';
import {
  addBook,
  removeBook,
  retrievedBookList,
} from 'src/app/state/books/books.action';
import { GoogleBookService } from '../books.service';

@Component({
  selector: 'app-book-app',
  template: `
    <h2>Books</h2>
    <app-book-list
      class="book-list"
      [books]="books$ | async"
      (add)="onAdd($event)"
    ></app-book-list>

    <h2>My Collection</h2>
    <app-book-collection
      class="book-collection"
      [books]="bookCollection$ | async"
      (remove)="onRemove($event)"
    >
    </app-book-collection>
  `,
  styles: [],
})
export class BookAppComponent implements OnInit {
  constructor(private bookService: GoogleBookService, private store: Store) {}

  books$ = this.store.pipe(select(selectBooks));

  bookCollection$ = this.store.pipe(select(selectBookCollection));

  onAdd(bookId: string): void {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string): void {
    this.store.dispatch(removeBook({ bookId }));
  }
  ngOnInit(): void {
    // (Book) ==> (Book: Book[])
    this.bookService.getBooks().subscribe((Book) => {
      this.store.dispatch(retrievedBookList({ Book })); // { Book } ==> { Book: Book[] }
    });
  }
}
