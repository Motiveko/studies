function Circle(radius) {
  // 일반 함수로 호출되면 new.target은 undefined이다.
  console.log(new.target)
  if(!new.target) {
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.raduis;
  }
}

