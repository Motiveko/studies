const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype = {
    constructor: Person,
    sayHello() {
      console.log(`Hi! I'm ${this.name}`);
    }
  }
  return Person;
}())

const a = new Person('a');

console.log(a.constructor); // Person

