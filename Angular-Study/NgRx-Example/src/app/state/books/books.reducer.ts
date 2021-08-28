import { createReducer, on } from '@ngrx/store';

import { retrievedBookList } from './books.action';
import { Book } from '../../books/books.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  // eslint-disable-next-line no-shadow
  on(retrievedBookList, (state, { Book }) => [...Book])
);
