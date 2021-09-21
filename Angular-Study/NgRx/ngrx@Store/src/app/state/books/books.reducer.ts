import { createReducer, on } from '@ngrx/store';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { retrievedBookList } from './books.action';
import { Book } from '../../books/books.model';

// export const initialState: ReadonlyArray<Book> = [];

export interface BookState extends EntityState<Book> {
  selectedBookId: string;
}

export function selectBookId(book: Book): string {
  return book.id;
}

export function sortByTitle(a: Book, b: Book): number {
  return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
}

export const adapter: EntityAdapter<Book> = createEntityAdapter({
  selectId: selectBookId,
  sortComparer: sortByTitle,
});

export const initialState = adapter.getInitialState({
  selectBookId: null,
});

export const booksReducer = createReducer(
  initialState,
  // eslint-disable-next-line no-shadow
  on(retrievedBookList, (state, { Book }) =>
    adapter.upsertMany([...Book], state)
  )
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select array of Ids
export const selectBookIds = selectIds;

// select the dictionary of book entities
export const selectBookEntities = selectEntities;

// select array of books
export const selectAllBooks = selectAll;

// select the total book count
export const selectBookTotal = selectTotal;
