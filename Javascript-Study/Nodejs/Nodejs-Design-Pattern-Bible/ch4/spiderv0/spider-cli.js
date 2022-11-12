import { spider } from "./spider2.js";

spider(process.argv[2], (err, filename, downloaded) => {
  if(err) {
    console.error(error);
  } else if(downloaded) {
    console.log(`다운로드 완료: ${filename}`);
  } else {
    console.log(`${filename}은 이미 다운로드 되었음.`)
  }
})