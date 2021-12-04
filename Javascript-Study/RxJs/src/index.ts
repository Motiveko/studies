import { animationFrameScheduler, asyncScheduler, queueScheduler } from "rxjs";

// asyncScheduler 사용예시 1
// asyncScheduler.schedule(
//   function (state) {
//     const stateNum = state as number;
//     if (stateNum > 5) {
//       this.unsubscribe();
//       console.log("unsubscribe");
//     }
//     console.log(stateNum);
//     this.schedule(stateNum + 1, 1000);
//   }, // delay값 이후 실행될 task. 내부에 this.schedule()이 있어 재귀적으로 실행되고있다.
//   3000, // delay
//   0 // 초기값
// );

/**
 * queueScheduler 동작!!!!!!!!
 * delay가 없기때문에 큐 자체는 synchronous하게 동작한다.
 * 그러나 내부에서 recursive하게 호출하는 동작은, work단위로 큐에서 실행하기 때문에 하나의 work가 끝난 후 다음work가 호출된다.
 * 이는 마치 비동기인것처럼 보여진다! 꼭 인지하자!!!!!!
 */
// console.log("start");
// queueScheduler.schedule(function (state) {
//   const stateNum = typeof state === "number" ? (state as number) : 3;
//   if (stateNum !== 0) {
//     console.log("before", stateNum);
//     this.schedule(stateNum - 1); // `this` references currently executing Action,
//     // which we reschedule with new state
//     console.log("after", stateNum);
//   }
// });
// console.log("end");

// animationFrameScheduler 실행 예시
// HTML : <div style="background: #0ff;"></div>
const div = document.querySelector("div");
animationFrameScheduler.schedule(
  function (height) {
    div!.style.height = height + "px";
    if ((height as number) > 300) {
      this.unsubscribe();
    }
    this.schedule((height as number) + 1); // `this` references currently executing Action,
    // which we reschedule with new state
  },
  0,
  0
);
