class Person {
  constructor() {
    this.name = 'motiveko';
    this.hi = () => console.log(this.name);
  }
  rm = this
}
const p = new Person();
console.log(p.rm)
