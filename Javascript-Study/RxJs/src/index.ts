import { BehaviorSubject, fromEvent, interval, merge, of, Subject } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  take,
  takeUntil,
  tap,
} from "rxjs/operators";

const subject = new BehaviorSubject(0);
const unsubscriber = new Subject();
type Coords = { id: number; x: number; y: number };

const addContent = (id: number | string, content: number) => {
  document.getElementById(`${id}`)!.innerText = String(content);
};

const addHtmlElement = (coords: Coords) => {
  document.body.innerHTML += `  <div 
    id=${coords.id}
    style="
      position: absolute;
      height: 30px;
      width: 30px;
      text-align: center;
      top: ${coords.y}px;
      left: ${coords.x}px;
      background: silver;
      border-radius: 80%;"
    >
  </div>`;
};

const clearDocs = () => {
  document.body.innerHTML = `<div id='intervalValue'></div>`;
};

const interval$ = interval(1000).pipe(
  map((v) => v % 10),
  tap((v) => {
    if (v === 0) {
      // clearDocs();
    }
  }),
  tap((v) => subject.next(v)),
  tap((v) => addContent("intervalValue", v))
);

const click$ = fromEvent(document, "click").pipe(
  map((e) => e as MouseEvent),
  mergeMap((e) => {
    const id = Math.random();
    addHtmlElement({ id: id, x: e.clientX, y: e.clientY });
    return subject.pipe(
      tap((v) => {
        if (v % 10 === 0) {
          unsubscriber.next("z");
        }
      }),
      takeUntil(unsubscriber),
      tap((value) => addContent(id, value)),
      catchError(() => of({}))
    );
  })
);

merge(interval$, click$).subscribe();
