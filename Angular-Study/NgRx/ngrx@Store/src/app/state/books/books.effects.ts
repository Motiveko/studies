import { Injectable } from '@angular/core';
import { GoogleBookService } from '@core/books/books.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

  constructor(
    private actions$: Actions,
    private bookService: GoogleBookService
  ) {}
}
