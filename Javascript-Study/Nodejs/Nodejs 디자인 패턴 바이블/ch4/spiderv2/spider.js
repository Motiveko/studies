import fs from 'fs';
import path from 'path';
import superagent from 'superagent'
import mkdirp from 'mkdirp';
import { urlToFilename } from '../util.js';

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, contents, cb); // http 응답을 파일 시스템에 쓰기
  });
}

function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`);
  superagent.get(url).end((err, res) => {
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

export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if(err) {
      if(err.code !== 'ENOENT') {
        return cb(err);
      }

      // 파일이 존재하지 않기 때문에 다운로드한다.
      return download(url, filename, (err, requestContent) => {
        if(err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, cb);
      })
    }
    // 파일이 이미 존재하여 링크를 처리한다.
    spiderLinks(url, fileContent, nesting, cb);
  })
}

function getPageLinks(url, body) {
  /** 현재 페이지의 url 호스트와 같은 호스트 url을 모두 가져와 반환한다. */  
  return ['https://example.com'];
}


/**
 * 비동기 I/O 작업을 iterate 함수를 이용해 반복한다.
 * spider() 함수의 콜백으로 iterate(index + 1)을 전달했기 때문에 links에 대해 순서대로 비동기 I/O가 진행되는것이 보장된다
 */
function spiderLinks(currentUrl, body, nesting, cb) {
  if(nesting === 0) {
    return process.nextTickcb(cb);  // ❗️마이크로 테스크 큐잉, 이게 없으면 콜백이 동기로 호출되어 블로킹 되는 경우가 생길 수 있다.
  }

  const links = getPageLinks(currentUrl, body); // string[] 
  if(links.length === 0) {
    return cb();  // 왜 모든 콜백을 마이크로 테스크 큐잉 하지 않은것일까
  }

  function iterate(index) {
    if(index === links.length) {  // 
      return cb(); 
    }

    spider(links[index], nesting - 1, function(err) {
      if(err) {
        return cb(err);
      }
      iterate(index + 1); // 재귀적인 호출로 iterate
    })
  }

  iterate(0);
}