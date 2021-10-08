// function Person(name, age) {
//   this.name = name;
//   let _age = age;
//   this.__proto__.sayHi = function() {
//     console.log(`name: ${this.name}, age : ${_age}`);
//   }
// }

// const p1 = new Person('mot1',13);
// const p2 = new Person('mot2',26);
// // p1,p2는 같은 프로토 타입을 참조하므로 sayHi 메소드도 같다. 
// // sayHi는 클로저인데, 자유 변수는 마지막에 할당된 26을 참조한다.
// p1.sayHi(); // name: mot1, age : 26
// p2.sayHi(); // name: mot2, age : 26

// const Person = (function(){
//   let _age = 0;

//   function Person(name, age) {
//     this.name = name;
//     _age = age;
//   }
//   Person.prototype.sayHi = function() {
//     console.log(`name: ${this.name}, age : ${_age}`);
//   }
//   return Person;
// }())

var funcs = [];
for(var i = 0; i < 3; i++) {
  funcs[i] = new function() { return i; };
}
funcs.forEach(f => console.log(f()));

const p1 = new Person('nick', 13);
const p2 = new Person('nick2', 22);
p1.sayHi();
p2.sayHi();
console.log(p1.sayHi === p2.sayHi)