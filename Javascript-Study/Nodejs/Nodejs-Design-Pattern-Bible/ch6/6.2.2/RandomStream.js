import {Readable} from 'stream';
import Chance from 'chance';

const chance = new Chance();

export class RandomStream extends Readable {
  constructor(options) {
    super(options);
    this.emittedBytes = 0;
  }

  _read(size) {
    const chunk = chance.toString({length: size});
    this.push(chunk, 'utf8'); // 내부 버퍼로 청크를 집어넣는다. 문자열이기 때문에 인코딩도 지정해야 한다.(binary buffer를 푸시할경우 no 필요)
    this.emittedBytes += chunk.length;
    if (chance.bool({likelihood: 5})) {
      // 5%확률로 true
      this.push(null); // null을 푸시하면 스트림은 종료된다.(end 이벤트);
    }
  }
}
