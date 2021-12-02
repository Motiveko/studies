# RxJS 정리 프로젝트

> 서적 [RxJS 반응형 프로그래밍] 을 정리하려고 만든 프로젝트였으나 책이 무슨말하는지 하나도 못알아듣겠어서 스스로 자료찾아 학습후 정리한다. 매번 쓸때마다 차이점이 조금씩 헷갈리는 operator나 Subject를 정리한다!

## Hot/Cold Observable, Unit/Multicast
RxJS 옵저버블은 기본적으로 구독 전까지 동작하지 않는데, 이런 특성을 갖는 Observable은 `Cold Observable`이라고 한다. 

`Cold Observable`은 모든 옵저버들이 구독하는 시점과 상관없이 방출하는 모든 데이터를 처음부터 빠짐없이 받는데, 이 말은 `Cold Observable`을 구독하는 ***모든 옵저버는 자신만을 위해 독립적인 실행을 하는 옵저버블을 갖게 된다***는 말이다. 이러한 특성을 `Unicast`라고 하고 이 때 옵저버블과 옵저버의 관계가 일대일이다.

반면 `Hot Observable`은 구독과 상관 없이 옵저버블 생성과 동시에 데이터 스트림을 방출한다. 따라서 중간에 구독하는 옵저버는 구독 시점 이후로 방출되는 데이터를 받게된다. 이는 ***`Hot Observable`을 구독하고 있는 모든 옵저버에게 부수 효과(side-effect)가 있다는 말***인데, 이러한 특성을 `Multicast`라고 하고 이 때 옵저버블과 옵저버의 관계는 일대다 관계다.

[이 문서](https://benlesh.medium.com/hot-vs-cold-observables-f8094ed53339#.8x9uam5rg)처럼 `ColdObservable`은 옵저버블이 `Producer`를 생산하는 것이고, `HotObservable`은 옵저버블이 `Producer`에게 찾아가는 것 이라고 정의하기도 한다.

<br>

***RxJs에서 `Observable`은 `Unicast`로, [`Subject`](#Subjects)는 `Multicast`로 작동한다.***

<br>

## Multicating Operators
---
### publish
```ts
function publish<T>(): UnaryFunction<Observable<T>, ConnectableObservable<T>>;
```

`publish`는 `Observable`을 인자로 받아 `ConnectableObservable`을 반환하는 ***함수를 반환***한다. `ConnectableObservable`은 `Multicast`로 동작하는 옵저버블로, `HotObservable`과 달리 ***`connect()`메서드 호출 전까지 값을 방출하진 않는다.*** 

<br>

#### Examples
--- 
1. 기본예시

```ts
import { interval } from "rxjs";
import { publish, take, tap } from "rxjs/operators";

const source = interval(1000);
const example = publish()(
  source.pipe(
    take(3),
    tap((_) => console.log("소스 옵저버블 tap 호출"))
  )
);

// 구독했지만 아직 값을 방출하기 시작하지 않는다.
const subsription1 = example.subscribe((val) =>
  console.log(`subscription1 : ${val}`)
);

// connect()함수 호출, 이제서야 값이 방출되기 시작한다.
example.connect();
// 1.2초뒤 구독 시작했으므로 첫번째 방출값은 받지 못한다.
setTimeout(
  () => example.subscribe((val) => console.log(`subsription2 : ${val}`)),
  1200
);
/*
    소스 옵저버블 tap 호출
    subscription1 : 0
    소스 옵저버블 tap 호출
    subscription1 : 1
    subsription2 : 1
    소스 옵저버블 tap 호출
    subscription1 : 2
    subsription2 : 2
*/
```


> ❗️`pipe` 내에서 `operator`로 사용시 문법이 좀 다른데, 이부분은 아직 봐도 이해가 안되므로 필요하면 나중에 다시찾아보자.

<br>

### multicast
> RxJS8에서 사라질 예정. 공식 문서에서 `connect`나 `share`를 대신 사용는것을 권장한다.

<br>

### share
```ts
function share<T>(): MonoTypeOperatorFunction<T>;
```
---
`share` 연산자는 소스 옵저버블을 multicast하는 새로운 옵저버블을 반환한다. 이 때 반환되는 옵저버블은 `HotObservable`과 달리 최초 구독시 값을 방출하기 시작한다.

<br>

#### Examples
--- 
1. 기본 예시
```ts
import { timer } from "rxjs";
import { tap, mapTo, share } from "rxjs/operators";

const source = timer(1000).pipe(
  tap(() => console.log("THIS IS SIDE EFFECT")),
  mapTo("**RESULT**")
);

// 기본 : ColdObservable, 옵저버 만큼 옵저버블이 생긴다.
const coldSub1 = source.subscribe(console.log);
const coldSub2 = source.subscribe(console.log);
/**
 * 약 1초 뒤
 * THIS IS SIDE EFFECT
 * **RESULT**
 * THIS IS SIDE EFFECT
 * **RESULT**
 */

// share를 이용한 multicast, 한개의 옵저버블을 두개의 옵저버가 공유, 구독해야 옵저버블이 시작된다.
const hotSource = source.pipe(share());
setTimeout(() => {
  const hotSub1 = hotSource.subscribe(console.log);
  const hotSub2 = hotSource.subscribe(console.log);
}, 1200);
/**
 * 약 2.2초 뒤
 * THIS IS SIDE EFFECT
 * **RESULT**
 * **RESULT**
 */
```

<br>

### shareReplay

```ts
function shareReplay<T>(configOrBufferSize?: number | ShareReplayConfig, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>
```
---
`shareReplay`는 기본적으로 `share`와 같이 소스 옵저버블을 multicast하는 옵저버블을 반환하는데, 차이점은 매개변수로 전달한 `bufferSize`만큼은 `ColdObservable`처럼 나중에 구독한 옵저버에게도 전달한다는 것이다. 이 때, 소스 옵저버블이 `complete`되어도 ***버퍼되는 방출값은 영구적으로 남아있어, 언제든 구독해서 값을 받아볼 수 있다***. 이런 점에서 `shareReplay`는 `ReplaySubject`와 동작이 비슷한데, 실제로 내부적으로 `ReplaySubject`를 사용해서 구현되어 있다.

<br>

`shareReplay`는 옵저버블을 multicast하면서, 값이 방출된 후 구독하는 옵저버가 있을것으로 예상될 때 사용할 수 있다.

<br>

#### Examples
--- 
1. 웹에서 방문한 마지막 url을 방출하는 옵저버블

```ts
import { Subject } from "rxjs";
import { tap, shareReplay, pluck } from "rxjs/operators";

const routeEnd = new Subject<{ data: any; url: string }>();

const lastUrl = routeEnd.pipe(
  tap((_) => console.log("executed")),
  pluck("url"),
  shareReplay(1)
);

const subscription1 = lastUrl.subscribe(console.log);

routeEnd.next({ data: {}, url: "url-path" });

setTimeout(() => lastUrl.subscribe(console.log), 1000);

/**
 * executed
 * url-path
 * url-path
 */
```

<br>

## Subjects
`Subject`는 옵저버블이면서 옵저버로 작동하는 특수한 옵저버블로, 여러 옵저버들에게 하나의 실행을 공유한다. RxJS에는 다음 4가지 종류의 `Subject`가 있다.
- [Subject](#Subject)
- [BehaviorSubject](#BehaviorSubject)
- [ReplaySubject](#ReplaySubject)
- [AsyncSubject](#AsyncSubject)

### Subject
### BehaviorSubject
### ReplaySubject
### AsyncSubject

<br><br>

## Combination

<br>

## zip
```ts
function zip<O extends ObservableInput<any>>(...observables: O[]): Observable<ObservedValueOf<O>[]>;
```
---

`zip`은 Observable 배열을 인자로 받아(소스 옵저버블), 내부의 모든 Observable이 모두 값을 방출하면, 방출된 값을 배열로 만들어 방출한다. 이 때 특징이 있는데,
1. 소스 옵저버블 중 한개라도 complete되면 해당 값을 마지막으로 방출하고 complete된다.
2. n번째 방출되는 배열의 각 요소는 각 소스 옵저버블의 n번째 방출값이다.

<br>

#### Examples
--- 

1. 여러개의 `interval`의 값을 `zip`으로 출력
```ts
import { interval, zip } from "rxjs";
import { take } from "rxjs/operators";

const example = zip(
  interval(1000).pipe(take(3)),
  interval(2000).pipe(take(4)),
  interval(500).pipe(take(5))
);

const subscribe = example.subscribe((val) => console.log(val));
// [0, 0, 0] 
// [1, 1, 1]
// [2, 2, 2]
```

2. Mouse Drag & Drop 시 시작/끝 좌표값 배열로 출력
```ts
import { fromEvent, zip } from "rxjs";
import { map } from "rxjs/operators";

const mouseEvent = (eventName: string) =>
  fromEvent(document, eventName).pipe(
    map((e) => e as MouseEvent),
    map((e) => ({ x: e.clientX, y: e.clientY }))
  );
zip(mouseEvent("mousedown"), mouseEvent("mouseup")).subscribe((result) =>
  console.log(result)
);
```

3. **마우스 클릭에 걸린 시간 출력**
```ts
import { fromEvent, zip } from "rxjs";
import { map } from "rxjs/operators";

const mouseEvent = (eventName: string) =>
  fromEvent(document, eventName).pipe(map(() => new Date()));

zip(mouseEvent("mousedown"), mouseEvent("mouseup"))
  .pipe(map(([downTime, upTime]) => upTime.getTime() - downTime.getTime()))
  .subscribe(console.log);
```