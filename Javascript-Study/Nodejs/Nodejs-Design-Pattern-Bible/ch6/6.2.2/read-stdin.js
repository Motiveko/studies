// 1. Non-Following (pause) 모드 => 스트림의 readable 이벤트에 핸들러를 연결하고, 스트림의 read() 메서드를 이용해서 청크를 읽는다.
// process.stdin
//   .on('readable', () => {
//     let chunk;
//     console.log('New data available');
//     /**
//      * process.stdin.setEncoding('utf8').read() 같은 형태로 인코딩 지정해서 text로 읽을수있음
//      * read(크기) 로 특정 양의 데이터를 읽을수 있음
//      */
//     while ((chunk = process.stdin.read()) !== null) {
//       console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
//     }
//   })
//   .on('end', () => console.log('End of stream'));

// 2. Following 모드 => 데이터 이벤트에 리스너를 연결, read()를 쓸 필요 없이 리스너에 바로 청크가 들어간다.
// process.stdin
//   .on('data', (chunk) => {
//     console.log('New data available');
//     console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
//   })
//   .on('end', () => console.log('End of stream'));

// 3. 비동기 반복자(스트림은 비동기 반복자(Iterator)이기 때문에 비동기 순회가 가능하다!)
async function main() {
  // 비동기 iterator는 9장에서 상세히 다룬다..
  for await (const chunk of process.stdin) {
    console.log('New data available');
    console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
  }
  // 스트림이 종료되면 for문을 빠져나온다.
  console.log('End of Stream');
}

main();