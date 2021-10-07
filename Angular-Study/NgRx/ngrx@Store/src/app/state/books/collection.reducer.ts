import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { addBook, removeBook } from './books.action';

// const initialState: ReadonlyArray<string> = [];

export function selectId(id: string): string {
  return id;
}
export const adapter: EntityAdapter<string> = createEntityAdapter({
  selectId,
});

export const initialState = adapter.getInitialState({});

export const collectionReducer = createReducer(
  initialState,
  on(removeBook, (state, { bookId }) => adapter.removeOne(bookId, state)),
  on(addBook, (state, { bookId }) => adapter.addOne(bookId, state))
);

const { selectIds, selectTotal } = adapter.getSelectors();

export const selectCollectionIds = selectIds;

export const selectCollectionTotal = selectTotal;
