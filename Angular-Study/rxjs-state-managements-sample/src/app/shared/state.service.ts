import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class StateService<T> {
  private state$: BehaviorSubject<T>;

  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }
  // 왜 next에 기존 ...this.state가 같이 들어가는건가?
  protected setState(newState: Partial<T>): void {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}
