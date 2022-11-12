import fs from "fs";
import path from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename } from "../util.js";

/**
 * spider1.js의 리팩토링
 * - 빠른 반환 원칙(return cb(...))
 * - 명명된 콜백 함수를 생성하여 적용(+코드의 모듈화)
 */
function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), (err) => {
    // 저장할 디렉터리가 있는지 확인
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, contents, cb); // http 응답을 파일 시스템에 쓰기
  });
}

function download(url, filename, cb) {
  // URL 이미 다운로드했는지 검사, ENOENT면 파일존재하지 않는것으로 파일생성 가능
  console.log(`Downloading ${url} into ${filename}`);
  superagent.get(url).end((err, res) => {
    // 파일 다운로드
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, filename);
    });
  });
}

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    if (!err || err.conde !== "ENONET") {
      return cb(null, filename, false);
    }
    download(url, filename, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, filename, true);
    });
  });
}
