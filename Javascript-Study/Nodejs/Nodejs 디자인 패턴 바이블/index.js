let values = [1, 2, 3, 4, 5, 6, 7];

const task = (v) => new Promise((resolve) => {
  console.log(`Task ${v} 시작`);
  setTimeout(() => {
    console.log(`Task ${v} 완료`)
    resolve(v)
  }, Math.random() * 3333)
});

const length = 1;
const promises = Array.from({length}, () => Promise.resolve());

const dequeueTask = (promise) => {
  console.log('dequee')
  if(values.length === 0) {
    return;
  }
  promise.then(() => {
    return dequeueTask(this)
  });
  return task(values.shift());
}


promises.forEach(promise => {
  promise.then(() => dequeueTask(this))
})

const promise= Promise.resolve()

promise.then(() => {
  
})