export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  next() {
    while(this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      // task 는 실행 결과 Promise를 반환할 것이다.
      task().finally(() => {
        this.running--
        this.next();
      })
      this.running ++;
    }
  }

  runTask(task) {
    console.log(this.queue.length)
    return new Promise((resolve, reject) => {
      // .then(onFullfilled, onRejected) 라는것을 기억하자. task()가 성공해서 resolve가 호출되면 runTask.then(..)로 실행이 넘어갈것이다.
      this.queue.push(() => task().then(resolve, reject));
      process.nextTick(this.next.bind(this));
    })
  }
}