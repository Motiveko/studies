import {promises as fsPromises} from 'fs';
import {dirname} from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import {urlToFilename, getPageLinks, promisify} from '../util.js';

const mkdirpPromises = promisify(mkdirp);

// return mkdirpPromises(filename, contents)

function download(url, filename) {
  console.log(`Downloading ${url} into ${filename}`);
  let contents;
  return superagent
    .get(url)
    .then((res) => {
      contents = res.text;
      return mkdirpPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, contents))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return contents;
    });
}

export function spider(url, nesting) {
  const filename = urlToFilename(url);
  return fsPromises
    .readFile(filename, 'utf8')
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      return download(url, filename);
    })
    .then((requestContent) => spiderLinks(url, requestContent, nesting));
}

function spiderLinks(currentUrl, body, nesting, cb) {
  let promise = Promise.resolve();
  if (nesting === 0) {
    return promise;
  }

  const links = getPageLinks(currentUrl, body);
  
  // promise 순차반복 패턴 1.
  links.forEach((link) => {
    promise = promise.then(() => spider(link, nesting - 1));
  });

  // promise 순차반복 패턴 2.
  // links.reduce((link, next) => {
  //   return next.then(() => spider(link, nesting - 1));
  // }, promise)

  return promise;
}
