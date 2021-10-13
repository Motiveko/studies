const arr = [1];
arr.length = 3;

console.log(arr[2]);
console.log(Object.getOwnPropertyDescriptors(arr));
