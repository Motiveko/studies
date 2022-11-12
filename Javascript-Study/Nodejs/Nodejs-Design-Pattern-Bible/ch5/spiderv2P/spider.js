import {promises as fsPromises} from 'fs';
import {dirname} from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import {urlToFilename, getPageLinks, promisify} from '../util.js';

const mkdirpPromises = promisify(mkdirp);

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

// 병렬실행
function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, body);
  
  const promises = links.map((link) => spider(link, nesting - 1));  // Promise[]

  return Promise.all(promises);
}
