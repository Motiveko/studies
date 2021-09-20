import { Book } from '@core/books/books.model';
import { createAction, props } from '@ngrx/store';

export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId }>()
);

export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId }>()
);

export const getBook = createAction('[Book List] Get Book');

export const getBookError = createAction('[Book Effects] Get Book Error');

/** Book state 저장 */
export const retrievedBookList = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ Book: Book[] }>()
);
