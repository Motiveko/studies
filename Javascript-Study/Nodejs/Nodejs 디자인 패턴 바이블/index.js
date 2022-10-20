async function delay(milli) {
  return new Promise((resolve) => setTimeout(() => resolve(), milli));
}
async function asyncFunc(bool) {
  await delay(1000);
  console.log('next');
  if (bool) {
    await delay(1000);
    throw new Error('걸렸네!!!');
  }
  return 30;
}

const arr = Array.from({length: 10}, (v,i) => asyncFunc(i == 5));
async function task() {
  for (const p of arr) {
    await p;
  }
  return 'task complete';
}

// task().then(console.log).catch(console.error);
Promise.allSettled(arr).catch(console.error)
