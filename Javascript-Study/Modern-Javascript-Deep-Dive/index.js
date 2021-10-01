const obj = {
  a : 1,
  b : 'b',
  __proto__ : {
    x: '출력되면 안되쥬'
  }
};

for(const key in obj) {
  console.log(`${key} : ${obj[key]}`);
}

for( const key of obj) {
  console.log(key)
}