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

  async runTask(task) {
    return new Promise((resolve, reject) => {
      // * .then(onFullfilled, onRejected) 라는것을 기억하자. task()가 성공해서 resolve가 호출되면 runTask.then(..)로 실행이 넘어갈것이다.  => 존나중요하다. runTask 호출측에서는 결국 전달한 task가 완료되고 resolve 호출 되고 나서 다음 작업을 수행하게 할 수 있는거싱다!!
      this.queue.push(() => task().then(resolve, reject));
      process.nextTick(this.next.bind(this));
    })
  }
}