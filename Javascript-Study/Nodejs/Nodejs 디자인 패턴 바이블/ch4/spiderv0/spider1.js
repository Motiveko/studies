import fs from 'fs';
import path from 'path';
import superagent from 'superagent'
import mkdirp from 'mkdirp';
import { urlToFilename } from '../util.js';
/**
 * 콜백패턴을 이용한 비동기 처리 사례 1.
 * 
 * 중첩 콜백(콜백지옥)으로 인한 가독성 떨어짐
 * in-place 콜백과 클로저로인해 추적이 힘든 메모리 누수 가능성 증가, 각 스코프에서 변수 이름 중복
 */
export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, err => {
    if(err && err.code === 'ENOENT') {  // URL 이미 다운로드했는지 검사, ENOENT면 파일존재하지 않는것으로 파일생성 가능
      console.log(`Downloading ${url} into ${filename}`);
      superagent.get(url).end((err, res) => { // 파일 다운로드
        if(err) {
          cb(err);
        } else {
          mkdirp(path.dirname(filename), err => { // 저장할 디렉터리가 있는지 확인
            if(err) {
              cb(err)
            } else {
              fs.writeFile(filename, res.text, err => { // http 응답을 파일 시스템에 쓰기
                if(err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filename, false);
    }
  })
}