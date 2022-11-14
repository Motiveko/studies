import {createServer} from 'http';
import Chance from 'chance'

const chance = new Chance();

const wait = (time = 30) => new Promise(resolve => setTimeout(resolve, time));
const server = createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'});
  while(chance.bool({likelihood: 99})) {
    res.write(`${chance.word()}\n`);
    await wait(30); // 이런거 없으면 너무 빠르게 응답이 처리되어서 통째로 응답 가는것처럼 느껴진다.
  }

  res.end('\n\n');
  res.on('finish', () => console.log('All data sent'));
})

server.listen(8080, () => {
  console.log('서버 on 8080')
})