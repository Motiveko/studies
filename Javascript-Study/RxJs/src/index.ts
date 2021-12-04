import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject } from "rxjs";

interface Cache {
  [url: string]: AsyncSubject<unknown>;
}
const cache: Cache = {};

function getResource(url: string): Observable<unknown> {
  if (!cache[url]) {
    cache[url] = new AsyncSubject();
    fetch(url)
      .then((response) => response.json)
      .then((data) => {
        cache[url].next(data);
        cache[url].complete();
      });
  }
  return cache[url].asObservable();
}

const url = "https://api.mock.com/v1/cedfd";
// 최초요청
getResource(url).subscribe((data) => console.log(data));

// 캐시된 내용이 나올것이다.(요청후 완료까지 3초가 안걸린다면)
setTimeout(() => {
  getResource(url).subscribe((data) => console.log(data));
}, 3000);
