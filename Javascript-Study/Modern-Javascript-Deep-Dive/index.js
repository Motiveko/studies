var Counter = (function() {
  var count = 0;

  return {
    increase() {
      return ++count;
    },
    decrease() {
      return --count;
    }
  }
}())

console.log(Counter.increase());
console.log(Counter.increase());
console.log(Counter.increase());
console.log(Counter.count);