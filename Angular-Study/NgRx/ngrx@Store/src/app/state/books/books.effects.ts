import { Injectable } from '@angular/core';
import { GoogleBookService } from '@core/books/books.service';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as BookAction from './books.action';

@Injectable()
export class BookEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookAction.getBook),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          map((Book) => BookAction.retrievedBookList({ Book })),
          tap(() =>
            console.log('BookEffects에서 getBook 액션을 가로챘습니다.')
          ),
          catchError(() => of(BookAction.getBookError()))
        )
      )
    )
  );

  /** ROOT_EFFECTS_INIT는 모든 root effect가 추가되고 나면 root effect가 최초 dispatch하는 action이다. */
  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => console.log('ROOT_EFFECTS_INIT dispatched by init$'))
      ),
    { dispatch: false }
  );

  logActions$ = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private bookService: GoogleBookService
  ) {}
}
