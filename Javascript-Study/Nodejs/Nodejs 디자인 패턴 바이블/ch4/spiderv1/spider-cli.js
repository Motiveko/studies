import { spider } from "./spider.js";

const url = process.argv[2];
const nesting = process.argv[3] || 1;

spider(url, nesting, (err) => {
  if(err) {
    console.error(err);
    process.exit(1);
  } 
  console.log('다운로드 완료');
});