import { EntityState } from '@ngrx/entity';
import { BookState } from './books.reducer';

export interface AppState {
  books: BookState;
  collection: EntityState<string>;
}
