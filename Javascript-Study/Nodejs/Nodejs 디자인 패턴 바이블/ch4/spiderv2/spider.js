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
/**
 * 비동기 처리시 같은 링크에 대해 여러번 다운로드하는 경우가 발생할 수 있다. 
 * 이를 위해 작업 시작 전 Set에 작업하는 link를 넣어 해당 link로 다시 다운로드 하지 않도록한다.(최적화)
 */
const spidering = new Set(); // Set<link>()
export function spider(url, nesting, cb) {
  
  if(spidering.has(url)) {
    return process.nextTick(cb);  // 이미 작업이 수행중/수행완료 이므로 spiderLink작업 없이 바로 cb를 큐잉한다.
  }

  spidering.add(url);

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
}


/**
 * 병렬(동시성)로 spider 작업 수행. 모든 작업이 완료되고 나면 콜백을 처리한다.
 */
function spiderLinks(currentUrl, body, nesting, cb) {
  if(nesting === 0) {
    return process.nextTickcb(cb);
  }

  const links = getPageLinks(currentUrl, body); 
  if(links.length === 0) {
    return process.nextTickcb(cb);
  }

  let completed = 0;
  let hasError = false;

  function done(err) {
    if(err) {
      hasError = true;
      return cb(err);
    }

    if(++completed >= links.length || !hasError) {
      return cb();
    }
  }

  links.forEach(link => spider(link, nesting - 1, done));
}                                                                                                                    