const number = (function() {
  let num = 0;
  return {
    increase() { return ++num; },
    decrease() { return --num; },
    get() { return num; },
    reset() {
      num = 0;
      return num;
    }
  }
}());

// 2-1 new Counter()로 매번 생성자 함수 호출해도 똑같은 상위 스코프를 참조하는 객체가 생성된다.(num 공유)
// const Counter = (function() {
//   let num = 0;
//   function Counter () {}
//   Counter.prototype.increase = function() {
//     return ++num;
//   }
//   Counter.prototype.decrease = function() {
//     return --num;
//   }
//   return Counter;
// }());

// 2-2 new Counter()로 생성자 함수 호출하면 매번 다른 num을 참조하는 객체 반환
const Counter = function() {
  (function() {
    let num = 0;
    
    increase = function() {
      return ++num;
    }
    decrease = function() {
      return --num;
    }
    return {increase, decrease};
  }())
}

// 3-1, makeCounter 호출시마다 다른 count를 참조하는 함수 생성
function makeCounter (predicate) {
  let count = 0;
  return function () {
    count = predicate(count);
    return count;
  }
}

// 3-2 makecount 매번 호출해도 같은 count를 참조하는 함수 생성
const makeCounter = (function () {
  let count = 0;
  return function(predicate) {
    count = predicate(count);
    return count;
  }
}())