# Node.js 교과서

> nodejs 스터디 시작!

![책 표지](https://image.yes24.com/goods/62597864/XL)


<br>

## 3. 노드 기능
---
### 3.1 REPL 사용하기
Javascript는 컴파일 없이 실행 가능한 스크립트 언어다. 브라우저 콘솔에서 바로 실행 가능한 이유는 바로 이것. 
노드도 비슷한 콘솔을 제공하는데 이를 `REPL`(Read Eval Print Loop)이라고 한다.

터미널에서 `node`를 치면 "Welcome to Node.js v16.13.0."와 함께 나오는 콘솔 창이 REPL로, 브라우저에서처럼 javascript 코드 실행이 바로 가능하다.

<br>

### 3.2 JS파일 실행하기
`REPL`에서 node {JS_파일_경로} 를 통해 자바스크립트 파일을 실행할 수 있다.


<br>

### 3.3 모듈로 만들기
`Node.js`의 `Commonjs` 모듈은 아래와 같은 형태로 만든다.
```js
// var.js
const odd = '홀수';
const even = '짝수';

module.exports = {
  odd, even
}
```
```js
// func.js
const { odd, even } = require('./var');

const checkOddOrEvent = function(num) {
  if(num%2) {
    return odd;
  }
  return even;
}

module.exports = checkOddOrEvent;
```
`require` 함수로 ESM의 `import`를, `module.exports`로 ESM의 `export`를 수행한다. exports의 마지막 s를 빼먹으면 정상 동작 하지 않는다. 주의하도록 하자.

<br>

`Node.js`의 버전 9부터 ESM을 사용할 수 있는데 사용 방법은 두가지가 있다.
  1. 모듈의 파일 확장자를 `.mjs`로 작성한다.
  2. `package.json`에 `type: 'module'`을 추가한다.

<br>

### 3.4 노드 내장 객체 알아보기
### 3.4.1 global
브라우저 환경의 `window`와 같은 전역 객체로, 모든 파일에서 접근이 가능하다. 또 `window.open()`을 `open`으로 씰 수 있는것처럼, `global`객체도 생략 가능하다.
```js
console.log(global)

{
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 1899720.7887919992,
      nodeStart: 1.006083999760449,
      v8Start: 1.773209000006318,
      bootstrapComplete: 14.187708999961615,
      environment: 8.451791999861598,
      loopStart: 29.60012499988079,
      loopExit: -1,
      idleTime: 1616225.887665
    },
    timeOrigin: 1642039806106.729
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
```

<br>

### 3.4.2 [console](https://nodejs.org/api/console.html)
`console` 객체도 `global`에 들어있다.
```js
console.log(global.console);
{
  log: [Function: log],
  warn: [Function: warn],
  dir: [Function: dir],
  time: [Function: time],
  timeEnd: [Function: timeEnd],
  timeLog: [Function: timeLog],
  trace: [Function: trace],
  assert: [Function: assert],
  clear: [Function: clear],
  count: [Function: count],
  countReset: [Function: countReset],
  group: [Function: group],
  groupEnd: [Function: groupEnd],
  table: [Function: table],
  debug: [Function: debug],
  info: [Function: info],
  dirxml: [Function: dirxml],
  error: [Function: error],
  groupCollapsed: [Function: groupCollapsed],
  Console: [Function: Console],
  profile: [Function: profile],
  profileEnd: [Function: profileEnd],
  timeStamp: [Function: timeStamp],
  context: [Function: context]
}
```
맨날 쓰는건 `log`, `dir`, `error`였는데 상당히 다양한 메서드가 있음을 할 수 있다.

- `time(레이블)`, `timeEnd(레이블)` : 같은 레이블을 가진 두 함수는 한 쌍으로서, time~timeEnd 사이의 시간을 측정한다.

- `log(내용)`, `error(내용)`: 맨날 쓰던것
- `table(배열)`: 배열을 표로 출력해준다. 배열의 내용물이 객체면 column명에 객체의 키값이 할당된다.
- `dir(객체, 옵션)`: 객체를 펼쳐서 보여준다. 옵션은 `showHidden`, `depth`, `colors`가 있다.
- `trace(레이블)`: 에러가 어디서 발생했는지 추적해준다. 일반적인 에러는 발생 위치를 알려주므로 잘 쓰진 않는다.

콘솔의 활용은 [여기](https://7942yongdae.tistory.com/87)를 참고해보자. 다양한 방식으로 콘솔을 활용한다.
<br>


### 3.4.3 타이머
`Node.js`환경에서 타이머 함수는 `setTimeout`, `setInterval`, `setImmediate`로 `global` 객체에 들어 있다. 각각의 타이머 함수는 ID를 반환하고, 이를 이용해 타이머 취소도 가능하다.

| 타이머 | 취소 |
|:---|:---|
|`setTimeout(콜백, ms)`|`clearTimeout(ID)`|
|`setInterval(콜백, ms)`|`clearInterval(ID)`|
|`setImmediate(콜백, ms)`|`clearImmediate(ID)`|

비동기로 즉시 실행을 위해 `setTimeout(콜백, 0)`을 많이 사용했는데, `setImmediate`와 실행 시점이 경우에 따라 다르다고 한다. 가급적 `setImmediate`을 쓰는것을 권장.

<br>

### 3.4.4 __filename, __dirname
`__filename`은 자바스크립트 파일명을 포함한 절대경로, `__dirname`은 파일명은 포함하지 않는 절대경로를 보여준다. 실행 운영체제에 따라 경로 구분자가 `/` 나 `\` 로 다르게 표시되어 문제가 될 때가 있는데 이때문에 보통 `path` 모듈을 같이 사용한다.


<br>


### 3.4.5 module, exports, require
모듈을 만들 때 `module.exports = `으로 만들었으나, `exports`객체를 사용해도 된다.
```js
exports.name = '고동기';  
```
`exports` => `module.exports` => {} 로 참조하므로 위 할당의 결과로 `module.exports`에도 {name: '고동기'} 가 들어가있게 된다. (반대의 경우는 그렇지 않은데, 이유는 모르겠다.)

`exports`는 'exports.key = value' 형태만 사용가능하다는 제약이 있다. 'exports = value'와 같이 사용하면 module 참조가 깨진다. 이러한 주의점이 있으므로 가급적 `module.exports`를 사용하도록 한다.

<br>

`requires`는 모듈을 불러오는 함수인데, 몇가지 속성을 가지고 있다.
```js
console.dir(require, {depth: 0});

[Function: require] {
  resolve: [Function],
  main: [Module],
  extensions: [Object: null prototype],
  cache: [Object: null prototype]
}
```
이중 `require.main`과 `require.cache`에 대해 알아본다.
```js
// func.js
module.exports = { name: '고동기' };
```
```js
// index.js
module.exports = '저를 찾아보시요';

require('./var');

console.log("===== require.cache =====")
console.log(require.cache)
console.log("===== require.main =====")
console.log(require.main)
console.log(require.main === module);
console.log(require.main.filename) 
```

```js 
$node index

// 출력 결과
===== require.cache =====
[Object: null prototype] {
  '/Users/donggi/Desktop/esm_test/source/index.js': [Module],
  '/Users/donggi/Desktop/esm_test/source/var.js': [Module]
}
===== require.main =====
Module {
  id: '.',
  path: '/Users/donggi/Desktop/esm_test/source',
  exports: '저를 찾아보시요',
  filename: '/Users/donggi/Desktop/esm_test/source/index.js',
  loaded: false,
  children: [Array],
  paths: [Array]
}
true
/Users/donggi/Desktop/esm_test/source/index.js
```
1. `require.cache` 객체에는 `{URL: MODULE}`로 모듈들을 캐시해서 가지고 있는다.
2. `require.main`은 노드 실행시 첫 모듈을 가리킨다. index.js를 실행했기 때문에 index.js를 가리키고, `children` 에 자식 모듈을 포함한다.(여기선 func.js)


`ESM`은 비동기로 모듈을 로딩해, Circular Dependency가 가능한데, Node.js는 동기로 처리하기때문에 이게 불가능하다.[❗️여기](https://ui.toast.com/weekly-pick/ko_20180402)를 참고하자. 

순환 참조가 있는 파일을 실행하면 module이 빈 객체로 표시되게 되어 코드가 예상한대로 동작하지 않을것이다. 따라서 `Node.js` 환경의 `CommonJS` 모듈 사용시 순환참조가 발생하지 않도록 주의해야한다.(보통 에러를 표시해주긴 하더라)

<br>

### 3.4.6 process
`process`에는 현재 실행중인 노드 프로세스에 대한 정보를 담고 있다. 아래의 내용은 기초적인것이다.
- `version`: 노드의 버전
- `arch`: 프로세서의 아키텍처, arm, x64 등
- `platform`: 운영체제 플랫폼, 윈도우는 win32/64, 맥은 darwin, linux 등
- `pid`: 프로세스 아이디
- `uptime()` : 프로세스 시작 후 흐른 시간
- `execPath` : 노드의 경로(/usr/local/bin/node')
- `cwd()` : 현재 프로세스가 실행되는 위치
- `cpuUsage()`: cpu 사용량

<br>

그 외 `env`, `nextTick(콜백)`, `exit()`은 중요하다고 한다.

<br>

1. env
process.env는 시스템의 환경 변수로, 노드의 실행헤 직접적인 영향을 끼치는 내용이 많다. 대표적으로 `UV_THREADPOOL_SIZE`, `NODE_OPTIONS`가 있다. 

`NODE_OPTIONS`는 노드 실행시 전달하는 옵션으로 Spring의 Argument와 비슷한 내용이다. 메모리 등을 설정할 수 있다.

`UV_THREADPOOL_SIZE`는 스레드 풀 개수다.

이외에 `process.env`에는 ***서비스의 중요한 키를 저장하는데 사용한다.*** 예를 들어 서버나 db의 비밀번호, API같은 것들은 코드에 직접 입력하면 위험한데, 이런 것들을 process에다가 사용하면 되는것이다. 아래와 같이 가져다 쓰면 된다.

```js
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
```

<br>

2. process.nextTick(콜백)
`nextTick`은 이벤트 루프가 다른 콜백 함수보다 우선으로 먼저 처리하도록 한다.

```js
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'), 0);
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

결과 : 
nextTick
promise
setTimeout
setImmediate
```
nextTick, Promise, setTimeout, setImmediate 순으로 실행되었다. `nextTick`, `Promise`는 ***마이크로 태스크***라고 따로 구분지어 부르고, 마이크로 테스크 큐에서 관리된다.

<br>

3. process.exit(코드)
서버를 수동으로 멈추기 위해 사용한다. 코드는 `0`은 정상 종료, `1`은 비정상 종료를 의미한다. 에러 발생으로 인해 실행시키는 `exit`에는 1을 넣어주면 되겠다.



<br>

### 3.5 노드 내장 모듈 사용하기
중요한것만 추렸다

### 3.5.1 [os](https://nodejs.org/api/os.html)
브라우저 환경에서 자바스크립트는 운영체제 정보를 가져올 수 없지만, 노드는 os 모듈을 통해 가져올 수 있다. 운영체제 종류, 아키텍쳐, 버전, cpu정보, 메모리 정보 등을 가져올 수 있다.

노드는 기본적으로 싱글 스레드로 대부분 코어 한개만 사용하는데, 나중에 `cluster`모듈을 사용해 코어 갯수에 맞춰 프로세스를 늘릴 수 있다. 이 때 `os.cpus()`를 통해 cpu 정보를 가져오게 된다.

필요할 때 공식 메뉴얼에 들어가 참고해보자.

<br>

### 3.5.2 [path](https://nodejs.org/api/path.html)
`path` 모듈은 폴더와 파일의 경로를 조작는것을 도와준다. 운영체제별로 경로 구분자가 달라 생기는 문제를 `path`모듈로 해결한다.(윈도우는 `\`, POSIX는 `/`)

```js
const path = require('path');

const string = __filename;

console.log('path.sep : ', path.sep); // 경로 구분자(/)
console.log('path.delimiter : ', path.delimiter); // 환경변수 구분자(:)
console.log('----------------------');
console.log('path.dirname() : ', path.dirname(string)); // 디렉토리 name(__dirname)
console.log('path.extname() : ', path.extname(string)); // 확장자명(.js)
console.log('path.basename() : ', path.basename(string)); // 파일명(index.js)
console.log('path.basename - extname : ', path.basename(string, path.extname(string))); // 파일명에서 확장자 빼고
console.log('----------------------');
console.log('path.parse() : ', path.parse(__filename)); // 객체 파싱
/**
{
  root: '/',
  dir: '/Users/donggi/Desktop/esm_test/source',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/
// 상대경로 생성(../../../..), /User/donggi로 가기위한 경로다.
console.log('path.relative() : ', path.relative(string, '/Users/donggi'));  
// 경로 생성( /Users/donggi/Desktop/esm_test/source )
console.log('path.join() : ', path.join(__dirname, '..', '..', '/esm_test', '/source')); 
// 경로 생성( /Users )
console.log('path.resolve() : ', path.resolve(__dirname, '..', 'source', '/Users'))
```
`path.join`과 `path.resolve`의 차이는, `resolve`에서 경로에 ***`/`로 시작하는게 있으면 이를 절대경로로 인식한다는 것***이다. 즉 앞의 모든 내용은 다 무시되고 절대경로에서 다시 시작한다.

<br>

### 3.5.3 [url](https://nodejs.org/api/url.html)
`url`은 인터넷 주소를 쉽게 조작하도록 도와주는 모듈이다. WHATWG 와 예전부터 노드에서 사용하던 방식의 url이 있다. 둘다 알아두자.

![WHATWG](https://miro.medium.com/max/1088/0*cuDgA7AY_J_0Pgxo)
```js
const url = require('url');
const { URL } = url;

const myURL = new URL('https://www.github.com/book/bookList.aspx?id=10001#ahcor');
console.log('new URL()', myURL);
console.log('new URL()', url.format(myURL));

====== 출력 ======
new URL() URL {
  href: 'https://www.github.com/book/bookList.aspx?id=10001#ahcor',
  origin: 'https://www.github.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.github.com',
  hostname: 'www.github.com',
  port: '',
  pathname: '/book/bookList.aspx',
  search: '?id=10001',
  searchParams: URLSearchParams { 'id' => '10001' },
  hash: '#ahcor'
}
new URL() https://www.github.com/book/bookList.aspx?id=10001#ahcor
```

`url` 모듈의 `URL` 생성자 함수와 동일한 동작을 하는 `url.format()` 함수도 있다.

`url.searchParam` 함수는 url의 search(query params)를 담고 있다. 사용법은 아래와 같다.

```js
const { URL } = require('url');
const myURL = new URL('https://naver.com?page=3&limit=1&category=node&category=js');

console.log('searchParams : ', myURL.searchParams); // 객체
console.log('searchParams.getAll() : ', myURL.searchParams.getAll('category')); // [node, js]
console.log('searchParams.get() : ', myURL.searchParams.get('limit'));  // 10
console.log('searchParams.has() : ', myURL.searchParams.has('page')); // true
console.log('searchParams.keys() : ', myURL.searchParams.keys()); // URLSearchParams Iterator{'page', 'limit', 'category', 'category'}
console.log('searchParams.values() : ', myURL.searchParams.values()); // URLSearchParams Iterator { '3', '1', 'node', 'js' }

myURL.searchParams.append('filter', 'es6');
console.log(myURL.searchParams.get('filter')); // es6
myURL.searchParams.set('filter', 'es2021');
console.log(myURL.searchParams.get('filter')); // es2021
myURL.searchParams.delete('filter', 'es2021');

console.log(myURL.searchParams.toString()); // page=3&limit=1&category=node&category=js
```

<br>

### 3.5.4 [querystring](https://nodejs.org/api/querystring.html)
WHATWG 방식의 url 대신 기존 노드의 url을 사용할 때, ***search부분을 사용하기 쉽게 객체로 만드는 모듈이다.*** 

> 이거 예제를 시도해보니 `url.prase()`를 사용하지 말라고 나온다.(deprecated) WHATWG 방식을 사용하라고 하니 쓰지말도록 하자.

<br>

### 3.5.5 [crypto](https://nodejs.org/api/crypto.html)
1. 단방향 암호화

단방향 암호화는 복호화 불가능한 암호화를 의미한다. `해시 함수`라고 부르기도 한다.

단방향 암호화 알고리즘은 주로 해시 기법을 사용한다. `해시 기법`은 문자열을 고정된 길이의 다른 문자열로 바꾸는 방식이다. 아래와 같이 사용한다.
```js
const crypto = require('crypto');

console.log('base64 : ' + crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex : ' + crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64 : ' + crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

====== 출력 결과 ======
// base64 : dvfV6nyLRRt3NxKSlTHOkkEGgqW2HRtfu19Ou/psUXvwlebbXCboxIPmDYOFRIpqav2eUTBFuHaZri5x+usy1g==
// hex : 76f7d5ea7c8b451b773712929531ce92410682a5b61d1b5fbb5f4ebbfa6c517bf095e6db5c26e8c483e60d8385448a6a6afd9e513045b87699ae2e71faeb32d6
// base64 : cx49cjC8ctKtMzwJGBY853itZeb6qxzXGvuUJkbWTGn5VXAFbAwXGEOxU2Qksoj+aM2GWPhc1O7mmkyohXMsQw==
```
- `createHash(알고리즘)`: 사용할 해시 알고리즘을 넣는다. md5, sha1, sha512 등
- `update(문자열)` : 암호화할 문자열을 넣는다.
- `digest(인코딩)` : 인코딩할 알고리즘을 넣는다. base64, hex, latin1 등이 있는데 base64의 결과가 가장 짧아 주로 사용된다.

해시 함수의 문제는 다른 문자열을 해시했을 때, 같은 결과값이 나올 수 있다는 것이다. 해킹은 이런 문자열을 찾는 과정을 의미한다.

현재는 주로 `pbkdf2`, `bcrypt`, `scrypt` 알고리즘으로 비밀번호를 암화하한다. 이중 `pbkdf2`를 사용해보자. `pbkdf2`는 문자열에 `salt`라는 문자열을 붙인후, 해시 알고리즘을 반복 적용하는 알고리즘이다.

```js
const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');  // randomBytes로 만든 64바이트 문자열을 salt로 사용
  console.log('salt : ', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password : ', key.toString('base64'));
  })
})

====== 결과 ======
// salt :  O8ErwdUOpBIKMfmu6A2aONTgjbQ9/jszuFMmq4U+Zu/aEbqutWkpVqB/9DWYY20SyNhHkAvkNSG2r8FhMh5PBw==
// password :  0v1dvTmkPBNgJ2ohcWaslJC6etakG9UbI0+VIJCd7G8KV98pxUG+SCfgG8Fj2gIJBvocg0i/gYYitImVGpUnpA==
```
위 코드의 과정은 `randomBytes()`로 생성한 64바이트 문자열을 `salt`로 사용해, `sha512`알고리즘으로 10만번 해시하는 것이다. 10만번 수행하므로 시간이 꽤(내 맥에서는 54ms)걸리는데, ***`crypto.randomBytes`나 `crypto.pbkdf2` 메서드는 내부적으로 스레드풀을 사용해 멀티 스레딩으로 동작하므로, 메인 스레드를 블로킹 하지 않는다.***

<br>

2. 양방향 암호화
양방형(대칭형) 암호화는 암호화된 문자열을 복호화 할 수 있으며, 키가 사용된다. 대칭형 암호화를 복호화하려면 암호화 할 때 사용한 키와 같은 키를 사용해야 한다.

아래는 노드로 양방향 암호화하는 방법이다. `aes-256` 알고리즘을 사용한다.

```js
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijabcdefghijabcdefghij12';
const iv = '1234567890123456';
const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
console.log('암호화 : ', result);
result += cipher.final('base64');
// console.log('암호화 : ', result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화 : ', result2)

====== 출력 ====== 
// 암호화 :  osu2dWCqKxUPfNrsQpwuFJaocNx5lVY5EpFOdTbv/X4=
// 복호화 :  암호화할 문장
```
- `crypto.createCipheriv(알고리즘, 키 iv)`: `알고리즘`, `키`, `iv`를 넣는다. `aes-256`에서는 키는 32바이트, `iv`는 16바이트여야 한다. `iv`는 초기화 벡터를 의미한다.
- `cipher.update(문자열, 인코딩, 출력 인코딩)` : 암호화할 대상, 대상의 인코딩, 출력 결과물의 인코딩을 넣는다. 문자열은 보통 `utf8`인코딩을, 암호는 `base64`를 사용한다.
- `cipher.final(출력 인코딩)`:출력 결과물의 인코딩을 넣으면 암호화가 완료된다.


- `crypto.createDecipheriv(알고리즘, 키, iv)`: 복호화 할 때 사용한다. 암호화 할 때 사용한 값을 그대로 넣어야한다.
- `decipher.update(문자열, 인코딩, 출력 인코딩)`: 인코딩은 암호화 시와 반대로 넣어야 한다.
- `decipher.final(출력 인코딩)`: 복호화 결과물의 인코딩을 넣는다.

암호화 관련해서 `crypto-js` 같은 라이브러리를 사용하면 좀 더 간단하게 암호화가 가능하다고 한다.


### 3.6 파일 시스템 접근하기
### 3.7 이벤트 이해하기
### 3.8 예외 처리하기
### 3.9 함께 보면 좋은 자료