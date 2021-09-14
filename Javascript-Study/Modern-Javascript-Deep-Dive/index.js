function repeat(n, f) {
  for( var i = 0; i < n; i++ ) {
    f(i)
  }
}
var logAll = (i) => console.log(i);

repeat(5, logAll);