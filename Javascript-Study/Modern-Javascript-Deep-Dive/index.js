function getThisBinding() {
  console.log(arguments);

  const arr = Array.prototype.slice.call(arguments);
  console.log(arr);

  // return this;
}

getThisBinding.apply(this, [1,2,3]);