import {promises as fsPromises} from 'fs';
import {dirname} from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import {urlToFilename, getPageLinks, promisify} from '../util.js';
import {TaskQueue} from './TaskQueue.js';
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

const spiderling = new Set();
async function spiderTask(url, nesting, queue) {
  if (spiderling.has(url)) {
    return;
  }
  spiderling.add(url);

  const filename = urlToFilename(url);

  const output = await queue.runTask(async () => {
    let content;
    try {
      content = await fsPromises.readFile(filename, 'utf8');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      content = download(url, filename);
    }
    return content
  });
  console.log(output)
  return spiderLinks(url, output, nesting - 1, queue);
}

function spiderLinks(currentUrl, body, nesting, queue) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, body);
  const promises = links.map((link) => spiderTask(link, nesting, queue));
  return Promise.all(promises);
}

export function spider(url, nesting, concurrency) {
  const queue = new TaskQueue(concurrency);
  return spiderTask(url, nesting, queue);
}
