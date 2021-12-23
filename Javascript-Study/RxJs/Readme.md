# RxJS 정리 프로젝트

> 서적 [RxJS 반응형 프로그래밍] 을 정리하려고 만든 프로젝트였으나 책이 무슨말하는지 하나도 못알아듣겠어서 스스로 자료찾아 학습후 정리한다. 매번 쓸때마다 차이점이 조금씩 헷갈리는 operator나 Subject를 정리한다!

<br><br>

## Overview
### Introduction
> RxJs는 Observable Sequence를 사용하여 비동기, 이벤트 기반 프로그램을 구성하는 라이브러리다.
<br>

### Observable
`Observable`은 **Lazt Push** 방식으로 동작하는 데이터를 생산하는 `Producer`이다.

Push - Pull 방식의 차이는 아래와 같다.

| | PRODUCER | COSUMER |
|---|---|---|
| `PULL` | Passive: 데이터 요청이 오면 생상한다 | Active: 데이터를 원하는 때 요청한다 |
| `PUSH` | Active: 데이터 요청이 없어도 그냥 생산해서 보낸다 | Passive: Producer가 주는 데이터에 반응한다. |

자바스크립트에서 일반적인 함수 호출은 `PULL`방식으로 작동한다고 할 수 있다. Consumer가 데이터를 원할때 함수를 호출하고, 함수는 호출된 시점에 데이터를 생산해서 반환한다.

`Observable`은, `Promise`등과 마찬가지로 구독만 이뤄지면 데이터를 생산하고, 생산 되는데로 소비자에게 PUSH하는 방식으로 작동한다. 소비자(Observable)은 구독만 했을 뿐, 데이터가 언제 넘어올지 모르고, 넘어오는 데이터에 반응할 뿐이다. 이런 방식의 프로그래밍을 **반응형 프로그래밍(Reactive Programming) 이라고도 한다.**

<br>

`Observable`은 종종 `EventEmiiter`와 비슷하게 동작한다고 생각되는데, 기본적으로 `Observable`은 구독 해야만 데이터를 생산하고, 구독하는 소비자마다 다른 Observable Stream을 공유하고 부수효과를 따로 가진다(`Unicast`)는 점에서 `EventEmiiter`와는 다르게 작동한다.

<br>

`Observable`의 동작은 총 4가지 단계로 나뉜다.
- 생산(creating)
- 구독(subscribing)
- 실행(executing)
- 폐기(disposing)

1. Creating Observable
Observable은 기본적으로 constructor로 생성하는데, 이 때 매개변수로 `Subscriber` 객체를 받는다. `Subscriber`는 기본적으로는 `next`, `error`, `complete`메서드를 가지는 객체로, 각각 값 방출, 에러 방출, 완료를 뜻한다.
<br>

2. Subscribing to Observables
`Observable.subscribe()` 메서드를 통해 옵저버블을 구독하고 실행하도록 할 수 있다. 매개변수로는 기본적으로 `Partial<Observer>` 타입을 받는데, `Observer`는 `Subscriber`의 `next`, `error`, `complete`메서드에 대한 콜백 메서드를 가진다.(콜백 메서드명도 next, error, complete)

<br>

3. Executing Observables
`Observable`의 구독은 곧 실행을 의미한다. 생성시 전달한 `Subscriber`가 실행되며 `next`, `error`, `complete`가 호출될것이다. 옵저버블의 동작은 유한할수도, 무한할수(예를들면 `interval()`로 생성된 옵저버블)도 있다. 


4. Disposing Observable Executions
옵저버블의 동작이 무한하다면, 구독자가 어느시점에 실행을 종료해줘야한다. `Observable.subscribe()`의 결과로 받는 `Subscription` 객체의 `unsubscribe()`메서드를 호출하면 실행을 종료하고 필요한 자원을 알아서 정리해준다.

<br>

### Observer
`Observer`는 `Observable`이 전달하는 데이터의 소비자(Consumer)이다. 옵저버는 `next`, `error`, `complete`콜백을 가지고 옵저버블 스트림을 처리한다. 

<br>

### Operators
`Operator`는 옵저버블의 동작을 제어하는 함수로, 두가지 종류가 있다.
1. `Pipeable Operators`는 `Observable.pipe()`의 매개변수로 전달되어 체이닝 될 수 있는 operator이다. `순수 함수`이기 때문에 ***기존 옵저버블을 변경하지 않고 새로운 옵저버블을 방출한다.***

2. `Creation Operators`는 보통 단독으로 호출될 수 있는 형태의 함수로, **새로운 옵저버블을 생성한다.**

계속 다룰 예정

<br>

### Subscription
`Subscription`은 Disposable Resource를 가리키는 객체로, 옵저버블의 실행을 말한다. `unsubscribe()`라는 메서드를 가지는데, 이는 리소스를 해제하는 역할을 하는 메서드다. 예전에는 `Subscription`을 `Disposable`이라고 불렀다고 한다.

`unsubscribe`가 구독을 취소한다는 것은 알고 있는데 어떻게 취소하는걸까? 우선 옵저버블은 `pipe`에 의해 여러개가 체이닝 되거나 `subscribtion.add()`로 여러개의 구독을 묶을 수 있는데, 이 때 마지막으로 전달받은 `Subscription` 객체의 `unsubscribe()`를 호출하면 알아서 연결된 모든 구독을 취소해준다. 
```ts
import { interval, merge } from "rxjs";
import { finalize } from "rxjs/operators";

const observable1 = interval(1000).pipe(
  finalize(() => console.log("observable 1 구독완료"))
);
const observable2 = interval(1000).pipe(
  finalize(() => console.log("observable 2 구독완료"))
);

// 두개의 옵저버블을 operator로 합쳐서 하나의 Subscription 객체를 받았다.
const subscription = merge(observable1, observable2).subscribe();

setTimeout(() => subscription.unsubscribe(), 1800);
// observable 1 구독완료
// observable 2 구독완료
```
```ts
const subscription1 = observable1.subscribe();
const subscription2 = observable2.subscribe();
// Subscription.add 로 두개의 구독을 묶었다.
subscription1.add(subscription2);

setTimeout(() => subscription1.unsubscribe(), 1800);
// observable 1 구독완료
// observable 2 구독완료
```
이렇게 편리하게 동작하는 이유는 구독결과 반환되는 Subscription객체는 부모(연결된) Subscription을 상호 참조하고있는데, 이를 이용해 연결된 모든 Subscription의 구독취소 로직(리소스 정리)을 실행하기 때문이다.
```ts
// Subscription.ts
export class Subscription implements SubscriptionLike {
  // ...

  unsubscribe(): void {
    // ...

    // Remove this from it's parents.
    const { _parentage } = this;
    if (_parentage) {
      this._parentage = null;
      if (Array.isArray(_parentage)) {
        for (const parent of _parentage) {
          parent.remove(this);
        }
      } else {
        _parentage.remove(this);
      }
    }
    // ...
``` 
명시적으로 `unsubscribe()`를 호출하지 않아도 구독하면 알아서 리소스를 정리까지 수행하는 Observable도 많다. 하지만 구독 취소가 필요한 옵저버블을 구독해놓고 구독취소하지 않으면 메모리 누수의 원인이 될 수 있으므로 주의해야한다.

<br>

### Subjects
기본 Observable은 `Unicast`방식으로 동작하는데 반해 `Subject`는 ***`Multicast`방식으로 작동될 수 있는 타입의 옵저버블이면서 동시에 옵저버인 객체다.*** 아래 예제는 `Subject`를 `Observable`/`Observer`로 써 사용한다.
```ts
import { from, Subject } from "rxjs";
import { tap } from "rxjs/operators";

const subject = new Subject<number>();

// Subject를 Observable로 사용
subject.subscribe((v) => console.log(`Observer1 : ${v}`));
subject.subscribe((v) => console.log(`Observer2 : ${v}`));

const observable = from([1, 2]).pipe(tap(() => console.log("SIDE EFFECT")));

// Subject를옵저버로 사용
observable.subscribe(subject);
/**
 * RESULT
 * "SIDE EFFECT"
 * Observer1 : 1
 * Observer2 : 1
 * "SIDE EFFECT"
 * Observer1 : 2
 * Observer2 : 2
 */
```
위 예제는 `Subject`를 활용해 `Observable`을 `Multicast`로 동작하게 만들었다. 옵저버블이면서 옵저버란 개념은 잘 와닿지 않는데, 이 예제를 보면 확실히 알 수 있다. 

RxJS에는 다음 4가지 종류의 `Subject`가 있다.
- [Subject](#Subject)
- [BehaviorSubject](#BehaviorSubject)
- [ReplaySubject](#ReplaySubject)
- [AsyncSubject](#AsyncSubject)

<br>

### Subject
기본적인 Subject 객체다. ***초기값이 없고, 값 방출 후 구독한 옵저버들은 값을 받을 수 없다.***
```ts
import { Subject } from "rxjs";
const sub = new Subject();
sub.next(1);
sub.subscribe((x) => {
  console.log("Subscriber A", x);
});
sub.next(2);
sub.subscribe((x) => {
  console.log("Subscriber B", x);
});
sub.next(3);
/**
 * Subscriber A 2
 * Subscriber A 3
 * Subscriber B 3
 */
```
<br>

### BehaviorSubject
`BehaviorSubject`는 ***초기값이 있고, 나중에 구독한 옵저버들도 마지막으로 방출한 값은 받을 수 있다.***
참고로 `Subject`의 `complete()` 호출 이후에 구독하면 값을 받을수 없다.

<br>

### Example
---
1. 다음 예제는 `document`에 `click`이벤트 발생 지점에 원을 랜더링하고, 랜더링 되는 원들이 하나의 Subject에서 방출되는 최근값을 랜더링 하도록 하는 예제다. [여기](https://stackblitz.com/edit/rxjs-behaviorsubject-mouseclicks?file=index.ts)에 가면 거의 비슷한 코드가 실행되는것을 확인할 수 있다.
```ts
import { BehaviorSubject, fromEvent, interval, merge } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

const subject = new BehaviorSubject(0);

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

const interval$ = interval(1000).pipe(
  tap((v) => subject.next(v)),
  tap((v) => addContent("intervalValue", v))
);

const click$ = fromEvent(document, "click").pipe(
  map((e) => e as MouseEvent),
  mergeMap((e) => {
    const id = Math.random();
    addHtmlElement({ id: id, x: e.clientX, y: e.clientY });
    return subject.pipe(tap((value) => addContent(id, value)));
  })
);

merge(interval$, click$).subscribe();
```
<br>

### ReplaySubject
`ReplaySubject`는 `BehaviorSubject`와 비슷하게 나중에 구독한 옵저버에게 버퍼된 값을 돌려준다. 

```ts
export class ReplaySubject<T> extends Subject<T> {
  //...
  constructor(bufferSize?: number, windowTime?: number, scheduler?: SchedulerLike);
}
```
`BufferSize`는 버퍼할 값의 갯수, `windowTime`은 버퍼할 시간이다. BufferSize 크기 windowTime 내에 방출된 값의 개수 중 작은 값만큼 버퍼한다. 옵저버가 구독하는 시점에 버퍼된 값으 개수만큼 일시에 `next()`로 방출한다.

참고로 `Subject`의 `complete()` 이후에도 **버퍼에 남아있는 값은 받을 수 있다.**(`BehaviorSubject`는 못받음)

---
Example
1. BufferSize가 100이지만 windowTime이 150ms이므로 최근 150ms동안 방출된 값만 캐시한다. 따라서 300ms 뒤에 구독하는 observerB가 받을 수 있는 값은 1부터다.
```ts
import { interval, ReplaySubject } from "rxjs";
import { take, tap } from "rxjs/operators";
const subject = new ReplaySubject(100, 150 /* windowTime */);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

interval(100)
  .pipe(
    take(3),
    tap((v) => subject.next(v))
  )
  .subscribe();

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 300);

// observerA : 0
// observerA : 1
// observerA : 1
// observerA : 2
// observerA : 2
```

<br>

### AsyncSubject
`AsyncSubject`는 Subject의 `complete()`가 호출되는 시점에 마지막으로 방출된(`next`) 값을 방출한다.
구현 코드는 대략 아래와 같이 생겼다. `complete()` 호출 이후에 구독해도 값을 받을 수 있다.
```ts
// AsyncSubject
export class AsyncSubject<T> extends Subject<T> {

  // ...

  next(value: T): void {
    // 값을 방출하지 않고 _value에 저장한다.
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  }

  complete(): void {
    // super.next(_value) 로 값을 방출한다!
    const { _hasValue, _value, _isComplete } = this;
    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && super.next(_value!);
      super.complete();
    }
  }
}
```
<br>

---
Example
1. `Subscriber`들은 `complete()`호출전 마지막으로 방출한 3만 받을 수 있고, 1,2는 유실된다. 또한 `Subject.complete()`이후 구독해도 값을 똑같이 받을 수 있다.
```ts
import { AsyncSubject } from "rxjs";
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(3);
subject.complete();

subject.subscribe((v) => console.log(`observerC: ${v}`));
// observerA: 3
// observerB: 3
// observerC: 3
```

<br>

2. Http Request Cache [(참고)](https://indepth.dev/reference/rxjs/subjects/async-subject)
```ts
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject } from "rxjs";

interface Cache {
  [url:string]: AsyncSubject<unknown>
}
const cache: Cache = {};

function getResource(url: string): Observable<unknown> {
  if(!cache[url]) {
    cache[url] = new AsyncSubject();
    fetch(url)
      .then((response) => response.json)
      .then((data) => {
        cache[url].next(data);
        cache[url].complete();
      })
  }
  return cache[url].asObservable();
}

const url = 'https://api.mock.com/v1/cedfd'
// 최초요청
getResource(url).subscribe((data) => console.log(data));

// 캐시된 내용이 나올것이다.(요청후 완료까지 3초가 안걸린다면)
setTimeout(() => {
  getResource(url).subscribe((data) => console.log(data));
}, 3000);
```

<br>

### [Scheduler](https://rxjs.dev/guide/scheduler)
`Scheduler`는 `구독의 시작`과 `notification`의 전달을 조절하는 기능을 수행한다. `Scheduler`는 `task`의 실행을 저장하는 `자료구조`이면서, `실행 컨텍스트`이고, 실행 시점을 알려주는 `clock`이다. 말로하면 이해가 안되니 예제를 다뤄본다.

아래 코드의 실행결과는?
```ts
import { asyncScheduler, Observable } from "rxjs";
import { observeOn } from "rxjs/operators";

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);

console.log('subscribe 전');
observable.subscribe(
  console.log,
  (err) => console.error(err),
  () => console.log('done')
)
console.log('subscribe 후');
```

```
결과 ====>

subscribe 전
subscribe 후
1
2
3
```
`observeOn`은 `scheduler`를 인자로 받아 **소스 옵저버블과 최종 옵저버블 사이에** `프록시 옵저버블`을 생성한다. 이 때, 프록시 옵저버블의 동작은 스케줄러가 결정하게 되는것이다.

`asyncScheduler`는 내부적으로 `setInterval`, `setTimeout`을 이용해 비동기로 동작하게 되는데, 여기서 `delay`값을 지정해주지 않아 마치 `setInterval(0)`와 같이 동작한 것이다. 결과적으로 ***동기 실행이 모두 종료(empty callstack)된 후 옵저버 동작이 실행되는 것이다.***

스케쥴러에는 `queueScheduler`, `asapScheduler`, `asyncScheduler`, `animationFrameScheduler`가 있는데 하나씩 알아본다.

<br><br>

### queueScheduler
`Queue`를 이용해서 스케쥴링 한다. `Iteration operation`에 사용할 수 있다.
<!-- TODO : 정리해야한다 -->


### asapScheduler
- 동작을 defer시킬때 쓴다. 이 말은 setTimeout(task, 0)와 거의 같다. 단, 이것보다 빠르다고 하는데 자세한건 좀 더살펴보자

### asyncScheduler
- setTimeout 과 같이 비동기로 동작하게 만들 때 쓴다.

### animationFrameScheduler 
- delay=0일 때 window.requestAnimationFrame 이 발생하면 task를 실행한다. 이 말은 repaint 되기 직전에 실행된다는 말이라고함. 찾아보자.
- 이를 이용해 smooth browser animation이 구현 가능하다.
- delay 있으면 asyncScheduler화 되므로 0으로 써야할듯





<br><br>

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