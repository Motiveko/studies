import {
  concat,
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  range,
  timer,
} from "rxjs";
import {
  debounce,
  debounceTime,
  defaultIfEmpty,
  delay,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  pluck,
  tap,
  timeInterval,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const csv = (str: string) => str.split(/,\s*/); // CSV 문자열에서 배열을 만드는 핼퍼함수

// 야후 파에낸스 REST API 링크와 출력 형식 요청
const webservice =
  "http://download.finance.yyahoo.com/d/queotes.csv?s=$symbol&f=sa&e=.csv";

const requestQuote$ = (symbol: string) =>
  ajax(webservice.replace(/\%symbol/, symbol)).pipe(
    pluck("response"),
    map((response) => response.replace(/"/g, "")),
    tap(console.log),
    map(csv) // 출력을 정리하고 csv 파싱
  );

const twoSecond$ = interval(2000); // 2초마다 값 방출

// symbol => 2초마다 방출되는 값을 symbol의 API 요청 응답(Observable)로 평탄화,
// 타입은 (symbol) => Observable
// const fetchDataInterval$ = (symbol: string) =>
//   twoSecond$.pipe(mergeMap(() => requestQuote$(symbol)));

const fetchDataInterval$ = (symbol: string) =>
  twoSecond$.pipe(
    mergeMap(() => requestQuote$(symbol)),
    distinctUntilChanged((prev, curr) => prev.price === curr.price)
  );

const symbols$ = of("FB", "APPL", "TESLA"); // symbol의 Observable

// symbol의 Observable을 fetchDataInterval 옵저버블에 맵핑 + 평탄화
const ticks$ = symbols$.pipe(mergeMap(fetchDataInterval$));

// ticks$.subscribe(([symbol, price]) => {
//   // DOM 랜더링
// });
