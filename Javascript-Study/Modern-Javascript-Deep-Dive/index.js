function Db(x) {
  this.n = x;


}
Db.n = 10;
Db.square =  function() {
  return this.n * this.n;
}

const d = new Db(3);

console.log(d);
console.log(d.__proto__.constructor.square())
console.dir(Db)
