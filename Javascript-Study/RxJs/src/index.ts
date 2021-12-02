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
