import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { of, OperatorFunction, pipe } from 'rxjs';
import { reduce, scan, tap } from 'rxjs/operators';
import { Book } from 'src/app/books/books.model';
import { AppState } from './app.state';

export const selectBooks = createSelector(
  (state: AppState) => state.books,
  (books: Array<Book>) => books
);

export const selectCollectionState = createFeatureSelector<
  AppState,
  ReadonlyArray<string>
>('collection');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);

export const selectLastStateTransitioins = (
  count: number
): OperatorFunction<unknown, unknown> => {
  return pipe(
    select(selectBookCollection),
    tap((book) => console.log('transition : ', book)),
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
      console.log('total : ', total);
      return total + n;
    })
  )
  .subscribe(console.log);
