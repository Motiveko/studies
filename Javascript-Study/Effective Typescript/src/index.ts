const xs: ArrayLike = [1,2,3];
for(const key in xs) {
  console.log(typeof key);  // string
  
  xs[key];            // 정상 
  xs[key.toString()]; // 인덱스 식이 'number' 형식이 아니므로 요소에 암시적으로 'any' 형식이 있습니다.
}
