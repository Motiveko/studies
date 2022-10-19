import { spider } from "./spider.js";

const url = process.argv[2];
const nesting = process.argv[3] || 1;
/** 프로미스 기반, 순차 실행과 반복 */
spider(url, nesting)
  .then(() => console.log('다운로드 완료'))
  .catch((err) => console.error(err));
