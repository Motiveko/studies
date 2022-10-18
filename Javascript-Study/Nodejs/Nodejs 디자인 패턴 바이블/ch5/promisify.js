import { randomBytes } from 'crypto';
 
/**
 * callbackBasedApi는 아래 조건을 만족한다는 가정
 * 1. api 호출시 콜백은 맨 마지막 인자로 받는다
 * 2. 콜백 함수는 (err, ...args) => {...} 형태로 에러를 맨 먼저 받는다
*/
export function promisifiy(callbackBasedApi) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function(err, ...result) { // 콜백
          if(err) {
            return reject(err);
          }
          resolve(...result);
        }
      ]
       
      callbackBasedApi(...newArgs);
    })
  }
}
