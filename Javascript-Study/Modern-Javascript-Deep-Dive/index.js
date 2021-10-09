class Super {
  constructor(name) {
    this.name = name;
    console.log(this);
  }
}

class Sub extends Super {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

const s = new Sub('adf', 13);
