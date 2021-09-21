import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { of, OperatorFunction, pipe } from 'rxjs';
import { reduce, scan } from 'rxjs/operators';
import { Book } from 'src/app/books/books.model';
import { AppState } from './app.state';
import * as booksReducer from './books.reducer';
import * as collectionReducer from './collection.reducer';

// export const selectBooks = createSelector(
//   (state: AppState) => state.books,
//   (books: Array<Book>) => books
// );

export const selectBooksState = createFeatureSelector<
  AppState,
  booksReducer.BookState
>('books');

export const selectBooks = createSelector(
  selectBooksState,
  booksReducer.selectAllBooks
);

export const selectCollectionState = createFeatureSelector<
  AppState,
  EntityState<string>
>('collection');

export const selectCollections = createSelector(
  selectCollectionState,
  collectionReducer.selectCollectionIds
);

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollections,
  (books: Book[], collection: string[]) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);

export const selectLastStateTransitioins = (
  count: number
): OperatorFunction<unknown, unknown> => {
  return pipe(
    select(selectBookCollection),
    // tap((book) => console.log('transition : ', book)),
    scan((acc, curr) => {
      return [curr, ...acc].filter(
        (val, index) => index < count && val !== undefined
      );
    }, [] as Book[])
  );
};

const numbers$ = of(1, 2, 3);

numbers$
  .pipe(
    // Get the sum of the numbers coming in.
    reduce((total, n) => {
      // console.log('total : ', total);
      return total + n;
    })
  )
  .subscribe(console.log);
