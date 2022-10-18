import fs from 'fs';
import path from 'path';
import superagent from 'superagent'
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from '../util.js';

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

function spiderTask(url, nesting, queue, cb) {
  const filename = urlToFilename(url);

  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if(err) {
      if(err.code !== 'ENOENT') {
        return cb(err);
      }

      return download(url, filename, (err, requestContent) => {
        if(err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, queue);
        return cb();
      })
    }
    spiderLinks(url, fileContent, nesting, queue);
    return cb();
  })
}

function spiderLinks(currentUrl, body, nesting, queue) {
  if(nesting === 0) {
    return;
  }
  
  const links = getPageLinks(currentUrl, body);
  if(links.length === 0) {
    return;
  }

  links.forEach((link) => spider(link, nesting, queue));
}

const spiderling = new Set()
export function spider(currentUrl, nesting, queue) {
  if(spiderling.has(currentUrl)) {
    return
  }

  spiderling.add(spider);
  queue.pushTask((done) => spiderTask(currentUrl, nesting, queue, done))
}
