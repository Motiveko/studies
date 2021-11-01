export const pi = Math.PI;

export function power(x, y) {
  return x ** y; // ES7 지수연산자
}

// ES6 클래스
export class Foo {
  #private = 10; // state3: 클래스 필드 정의 제안

  foo() {
    // stage4: 객체 Rest/Spread 프로퍼티 제안
    const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 };
    return { a, b, x };
  }

  bar() {
    return this.#private;
  }
}
