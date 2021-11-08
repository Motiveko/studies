## 5 반응형 스트림 적용하기
## 5.1 하나를 위한 모두, 모두를 위한 하나 ( merge )
- 다중 스트림을 하나로 결합하고 단일 옵저버로 모든 스트림을 처리하는 방법은 아래와 같다.
  - 스트림을 병합하여 이벤트 인터리빙(interleaving)하기
  - 스트림을 연결하여 이벤트 순서 유지하기
  - 최신 스트림 데이터로 전환하기 : 버튼을 클릭하여 HTTP 호출을 시작하거나 타이머를 시작하는 것 처럼 어떤 이벤트가 다른 이벤트를 실행할 때 사용


### 5.1.1 스트림을 병합하여 이벤트 인터리빙하기
- `merge`는 두 이벤트에서 OR 연산을 수행하는 것과 같다. 이벤트가 도착한 순서대로 단일 스트림에 배치한다.
  
```js
const source1$ = interval(1000).pipe(
  map(x => `Source 1 ${x}`),
  take(3)
)
const source2$ = interval(1000).pipe(
  map(y => `Source 2 ${y}`),
  take(3)
)
merge(source1$, source2$)
  .subscribe(console.log);
```
- merge시 타입이 다른 스트림을 병합한다면, merge후 병합하는게 아니라 **merge 전 각각의 스트림을 병합하려는 형태에 맞추는것이 바람직하다.** 이렇게 하면 이후 추가되는 streamd을 병합할 때 추가되는 스트림의 형태만 알맞게 바꿔주면 된다.
```js
// 마우스 클릭과 디스플레이 터치 이벤트를 병합, merge 후 병합한다.
const mouseup$ = fromEvent(document, 'mouseup');
const touchEnd$ = fromEvent(document, 'touchend');

merge(mouseup$, touchEnd$)
  .pipe(
    tap(console.log),
    map(event => {
      switch(event.type) {
        case 'touched': 
          return { left: event.changedTouches[0].clientX,
                  top: event.changedTouches[0].clentY};
        case 'mouseup':
          return { left: event.clentX,
                  top: event.clientY};
      }
    })
  ).subscribe()
```

```js
// merge 전 각각의 스트림의 형태를 map()연산자로 변환
const mouseup$ = fromEvent(document, 'mouseup')
  .pipe(
    map(event => ({
      left: event.clentX,
      top: event.clientY
    }))
  );
const touchEnd$ = fromEvent(document, 'touchend')  .pipe(
  map(event => ({
    left: event.changedTouches[0].clientX,
    top: event.changedTouches[0].clentY
  }))
);
merge(mouseup$, touchEnd$).subscribe()
```
- ❗️ `merge`는 병합된 옵저버블에서 메모리에 현존하는 모든 데이터를 방출한다. 인터리빙은 interval()이나 마우스 움직임 같은 이벤트가 비동기로 도착할 때 발생하지만, 데이터를 `동기`로 불러오면 다음 방출 전에 하나의 전체 스트림을 방출한다. 예시로보면 쉽다.

```js
const source1$ = of(1,2,3);
const source2$ = of('a', 'b', 'c');

merge(source1$, source2$).subscribe(console.log); // 1,2,3,'a', 'b', 'c'
```
- 위 코드를 실행하면 1,'a',2,'b'..가 아닌 각각 한번에 데이터를 방출한다는 것
- 데이터가 동기든 비동기든 관계없이 병합된 스트림에서 이벤트 순서를 유지하는것이 목적이면 `연결 연산자`를 사용해야한다.

<br>

### 5.1.2 스트림을 연결하여 이벤트 순서 유지하기 ( concat )

- `merge`는 이벤트를 받는 순서대로 출력한다.
- `연결`(concatenation) 연산자 `concat`은 **한 옵저버블에서 모든 이벤트를 받은 다음에야 두번째 옵저버블에서 이벤트를 받는다.**

![concat](https://rxjs.dev/assets/images/marble-diagrams/concat.png)
- `merge`연산자는 모든 소스 옵저버블을 즉시 구독할 수 있지만, `concat`연산자는 한번에 하나의 옵저버블만 구독할 수 있다.

```js
const source1$ = range(1,3).pipe(delay(3000));
const source2$ = of('a', 'b', 'c');
concat(source1$, source2$).subscribe(console.log)
// 3000ms 후..
// 1,2,3,a,b,c
```
- mouseend와 touchend같은 `DOM이벤트`를 병합할 때, mouseend 이벤트를 어느 지점에서 종료해 주지 않으면 touchend는 영영 처리하지 않는 형태의 문제가 발생할 수 있다.
- 또한 2번째가 `Hot Observable` 이라면 앞의 Observable이 끝날때까지의 이벤트는 누락된다.( 예: DOM event)

<br>

### 5.1.3 최신 옵저버블 데이터로 전환하기 (switch)
> `switch` 연산자는 Rxjs4 이후 없어졌다. `switchMap`으로 대체할 수 있다. 
- `switch` 연산자는 소스 Observable에 맵핑된 다른 Observable을 가져와서 소스와 결합한다. 디 때, **소스 옵저버블이 방출 될 때마다 switch는 즉시 구독을 취소하고 맵핑된 옵저버블에서 이벤트를 방출한다는 것이다.**

```js
fromEvent(inputText, 'keyup')
  .pipe(
    debounceTime(1000),
    switchMap(query => sendRequest(query)),
  )
  .subscribe(console.log);
```
- keyup 이벤트 발생시 1초간 기다리고 sendRequest()로 http request를 보내 반환되는 Observable을 구독한다. 응답이 오기전 keyup 이벤트 발생하면 sendRequest 구독을 취소하고 다시 1초간 기다리고, 응답이 오면 응답을 console에 출력한다. ***즉 소스와 맵핑 Observable의 구독을 switching 하는것이다.***

<br>

## 5.2 중첩 옵저버블 처리하기
- `Observable<Observable<T>>` 형태의 옵저버블을 중첩 옵저버블이라고 한다. 기존의 `merge`, `concat` 혹은 `map` operator는 Observable이 아닌 스칼라 값을 받기 때문에 이를 적절히 처리할 수 없다.
- 이런 중첩 옵저버블을 평탄화해 처리하는 연산자를 조인 연산자(join operator)라고 한다.
- 아래 예시는 `input`에서 사용자 입력 이벤트를 구독해 ajax 요청을 날리는 예시다. 
```ts
  const searchBox = document.querySelector("input");
  const notEmpty = (input: string) => !!input && input.trim().length > 0;

  fromEvent(searchBox, "keyup").pipe(
    pluck("target", "value"),
    debounceTime(500),
    filter(notEmpty),
    tap(console.log),
    map((query) => URL + query),
    mergeMap((query) =>
      ajax(query).pipe(
        // Creation - ajax
        pluck("response", "query", "search"),
        defaultIfEmpty([]) // AJAX 호출 결과가 빈 값이면 빈 배열로 반환
      ),
    ),
  ).subscribe(console.log);
```

<br>

## 5.3 비동기 스트림 마스터하기
- `mergeMap` 연산자를 응용하여 주식 시세 표시기를 구현해본다. 여러 옵저버블을 `mergeMap`연산자로 체이닝하는 예제다.
```ts

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
const fetchDataInterval$ = (symbol: string) =>
  twoSecond$.pipe(mergeMap(() => requestQuote$(symbol)));

const symbols$ = of('FB', 'APPL', 'TESLA'); // symbol의 Observable

// symbol의 Observable을 fetchDataInterval 옵저버블에 맵핑 + 평탄화
const ticks$ = symbols$.pipe(
  mergeMap(fetchDataInterval$)
);

ticks$.subscribe(
  ([symbol, price]) => {
    // DOM 랜더링...
  }
)
```

- 매 2초마다 symbol들에 대해 http request를 날리고 최종 구독부분에서 결과를 랜더링한다.
- symbol에 대한 결과가 이전과 동일하다면 굳이 랜더링하지 않는것이 성능상 좋을것이다. 이를 위해 `distinctUntilChanged` operator를 적용할 수 있다. symbol 단위로 일치여부를 평가해야하므로 `fetchDataInterval$`의 pipe에 적용한다.
```ts
const fetchDataInterval$ = (symbol: string) =>
  twoSecond$.pipe(
    mergeMap(() => requestQuote$(symbol)),
    distinctUntilChanged(([symbol, price]) => price)  // 주가를 기준으로 비교한다. 주가가 변경될때만 DOM을 갱신하게된다.
  );
```
- ***기본적으로 3가지 join 연산자가 있다. 각각 아래와 같다.***
  - `mergeMap` : 함수를 반환하는 옵저버블을 소스 옵저버블의 각 항목 값에 매핑하고 출력 옵저버블을 평탄화한다.
  - `concatMap` : mergeMap과 비슷하게 병합이 연속적으로 발생한다. **각 옵저버블은 이전 옵저버블이 완료될 때까지 대기한다.**
  - `switchMap` : mergeMap과 비슷하지만 최근에 매핑된 옵저버블 값만 표시한다. 즉 **가장 최근 값을 방출하는 맵핑된 옵저버블로 전환하여 이전의 내부 옵저버블을 취소한다.** 이전 옵저버블의 구독을 취소하는것은 매우 유용햐게 사용할 수 있다.

<br>

## 5.4 `concatMap`으로 드래그 앤 드롭 구현하기


