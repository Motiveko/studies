import { pi, power, Foo } from "./lib";

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());

// polyfill이 필요하다.
console.log(
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 100);
  })
);
