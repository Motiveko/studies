const p = Promise.resolve(10);
const obj = {
  a: 10,
  b: 20,
  c: 30,
};
const arr = Object.values(obj);
const exists = arr.includes(20);