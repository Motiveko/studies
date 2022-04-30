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

암호화 관련해서 [`crypto-js`](https://www.npmjs.com/package/crypto-js) 같은 라이브러리를 사용하면 좀 더 간단하게 암호화가 가능하다고 한다.

<br>

### 3.5.6 [util](https://nodejs.org/api/util.html)
`util`은 유틸리티 모듈이다. 여러가지 기능이 있는데 많이 쓰이는 두개만 알아본다.
1. `util.deprecate(fn, msg[, code])` : 첫번째 인자로 받은 함수가 deprecated 되었음을 알려 준다. 
```js

const util = require('util');

const dontUseMe = util.deprecate((a, b) => {
  console.log(a, b);
}, 'dontUseMe 함수는 지원이 중단된 함수입니다.');

dontUseMe(1,2);

====== 출력 결과 ======
// 1 2
// (node:43174) DeprecationWarning: dontUseMe 함수는 지원이 중단된 함수입니다.
// (Use `node --trace-deprecation ...` to show where the warning was created)
```

2. [`util.promisify(original)`](https://nodejs.org/api/util.html#utilpromisifyoriginal): 콜백 패턴의 함수를 `Promise` 기반으로 바꿔준다. 이를 통해 `async/await` 까지 사용 가능하다. ***콜백 함수는 반드시 (err,  res) => {} 형태로 첫째 인자에는 에러가 들어가야 적용 가능하다.***

```js
const util = require('util');
const crypto = require('crypto');

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString('base64'));
  })
  .catch((error) => {
    console.error(error);
  })
```

아래에 보는 것 처럼 `crypto.randomBytes` 함수의 콜백은 (err, buf) => void 형태이기 때문에 적용 가능하다.

```ts
// crypto.d.ts
function randomBytes(size: number, callback: (err: Error | null, buf: Buffer) => void): void;
```
아래 케이스는 직접 테스트를 위해 만들어보았다.
```js
const util = require('util');

const callback = (function() {
  let a = 0;

  return (callback) => {
    if(a % 2 === 1) {
      callback(null, a);
    }
    else {
      callback('짝수는 에러메시지', a);
    }
    a++;
  }
})();

const promisified = util.promisify(callback);

for(let i = 0 ; i< 5; i++) {
  promisified()
    .then(console.log)
    .catch(console.log)
}
console.log('끝')

====== 출력 ======
// 끝
// 1
// 3
// 짝수는 에러메시지
// 짝수는 에러메시지
// 짝수는 에러메시지
```
위 케이스에서 `Promise`는 마이크로 테스크 큐에 의해 비동기 처리되는데, 이 때 resolve가 무조건 우선실행되고, reject는 모든 resolve가 다 실행된 후에 실행됨을 알 수 있다.

<br>

### 3.5.7 [worker_threads](https://nodejs.org/api/worker_threads.html)
노드에서 `worker thread`를 이용하면 멀티 스레드 방식으로 작업이 가능하다.

```js
const {
  Worker, isMainThread, parentPort
} = require('worker_threads');

if(isMainThread) { // 메인스레드(부모)일 때
  const worker = new Worker(__filename);
  worker.on('message', message => console.log('from worker : ', message))
  worker.on('exit', () => console.log('worker exit'));
  worker.postMessage('Ping');
} else {  // 워커일 때
  parentPort.on('message', (value) => {
    console.log('from parent : ', value);
    parentPort.postMessage('Pong');
    parentPort.close();
  })
}
```
`Worker`는 javascript의 execution thread이다.
```js
/*
 * The `Worker` class represents an independent JavaScript execution thread.
 ...
 */
class Worker extends EventEmitter {
  // ...
  addListener(event: 'error', listener: (err: Error) => void): this;
  emit(event: 'error', err: Error): boolean;
  on(event: 'error', listener: (err: Error) => void): this;
  removeListener(event: 'error', listener: (err: Error) => void): this;
  // ...
}
```
`isMainThread`는 현재 코드가 `메인 스레드`(기본 싱글스레드를 말함)에서 실행되는지, 아니면 `Worker`로 직접 생성한 `워커 스레드`에서 실행되는지에 대한 boolean값이다.
`parentPort`는 부모 스레드인데, 메인 스레드에서 워커를 생성하면 해당 워커의 부모는 메인스레드이다.

위의 시그니처에 보이는 것처럼 `Wokrer`는 `EventEmitter`를 상속한다. `on()` 메서드로 핸들러를 등록할 수 있고, `emit()`메서드로 이벤트를 방출할 수 있다. 위 예제에서 `postMessage()`는 `message`이벤트를 발생시키는 함수다. 부모와 자식간의 핑퐁을 확인할 수 있다.

`new Worker`호출 시 두번째 인수의 `workerData`속성으로 원하는 데이터를 보낼 수 있다. 자식 `Worker`에서는 `worker_threads`모듈의 `workerData`로 받을 수 있다.

```js
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

console.log('start!');

if(isMainThread) {
  const threads = new Set();
  threads.add(new Worker(__filename, {
    workerData: { start: 1 }
  }));
  threads.add(new Worker(__filename, {
    workerData: { start: 2 }
  }))

  for(let worker of threads) {
    worker.on('message', message => console.log(`from worker : ${message}`));
    worker.on('exit', () => {
      threads.delete(worker);
      if(threads.size === 0) {
        console.log('job done');
      }
    })
  } 
} else {
    const data = workerData;
    parentPort.postMessage(data.start + 100);
}
console.log(isMainThread ? 'main end' : 'worker end');

====== 출력 결과 ======
// from worker : 101
// from worker : 102
// job done
```

위와 같이 스레드 생성시 데이터를 넘겨줘 해당 데이터를 스레드가 활용할 수 있다.

멀티스레드는 코드양도 늘어나고 스래드 사이의 통신에 발생하는 오버헤드도 상당하므로, 여러가지 상황을 잘 고려해서 사용해야한다.(성능 측정은 필수인듯)

<br>

### 3.5.8 [child_process](https://nodejs.org/api/child_process.html)
`child_process`는 다른 `프로세스`를 만들 때 사용한다. 노드에서 ***다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈***로, 예를들면 파이썬의 코드를 실행하고 결과를 받을 수 있다.
```js
const { exec , spawn } = require('child_process');

const shellProcess = exec('ls');

pythonProcess.stdout.on('data', (data) => {
  console.log(data);
});

pythonProcess.stderr.on('data', (err) => {
  console.error(err);
})

const pythonProcess = spawn('python', ['test.py']);

pythonProcess.stdout.on('data', (data) => {
  console.log(data);
});
```
`exec`는 셸을 실행해서 명령어를 수행하고, `spawn`은 새로운 프로세스를 띄우면서 명령어를 실행한다. `spawn`의 세 번째 인수로 `{ shell: true }`를 넣어주면 셸을 실행해서 명령어를 수행한다.

위 코드를 보면 `stdout`(표준출력)과 `stderr`(표준에러)에 붙여둔 data 이벤트 리스너에 결과가 `버퍼 형태`로 전달된다. 버퍼는 3.6에서 알아보자.

<br>

### 3.6 파일 시스템 접근하기
[`fs 모듈`](https://nodejs.org/api/fs.html)은 파일 시스템에 접근하는 모듈이다.
<!-- 모듈만 하니까 넘 지루하다. 뒤로 넘어갔다가 이거 해야할 때 다시 돌아오자. -->

<br>

### 3.7 이벤트 이해하기
### 3.8 예외 처리하기
### 3.9 함께 보면 좋은 자료

<br><br>

## 4. http 모듈로 서버 만들기
---
### 4.1 요청과 응답 이해하기
### 4.2 REST와 라우팅 사용하기

### 4.3 쿠키와 세션 이해하기

### 4.4 http와 http2

### 4.5 cluster
### 4.6 함께보면 좋은 자료

<br><br>

## 5. 패키지 매니저
### 5.1 npm 알아보기
`NPM`은 Node Package Manager로 말 그대로 많은  노드 패키지를 관리하는 매니저다. 

대체자로 페이스북이 내놓은 `yarn`이 있고, npm 대비 몇가지 편리한 기능도 있지만 별도 설치가 필요하다. `npm`이 너무 느리면 `yarn`을 통해 패키지를 설치해도 된다.

<br>

### 5.2 package.json으로 패키지 관리하기
- `package.json`은 패키지의 버전을 관리하는 파일이다. 
- npm init 으로 package.json을 만들고 express를 설치해보자
- 설치 메시지중 `WARN`이 나오는데, `WARN`은 경고일 뿐이라 무시해도 된다. `ERROR`만이 진짜 에러다.
  - `npm WARN npmtest@0.0.1 No repository field`: package.json에 repository필드가 없을 때 발생하는 경고
  - `found [발견 숫자] [심각도] severity vulnerabilities run 'npm audit fix'...` : 패키지에 있을수 있는 취약점을 자동으로 검사함. `npm` 패키지에는 가끔 악성 코드를 담은 패키지가 있을 수 있는데, npm audit을 통해 이를 검사할 수 있다. npm aduit fix는 npm이 스스로 수정할 수 있는 취약점을 알아서 수정해준다.
- `--save`: dependencies에 패키지 이름을 추가하는 옵션인데, `npm@5`부터는 기본으로 설정되어 있으므로 적을 필요가 없다.

- `package-lock.json`: 패키지들의 정확한 버전과 의존 관계가 담겨 있는 파일이다.
- npm의 전역 설치 옵션(`-g`)는 패키지를 현재 프로젝트의 node_modules 폴더가 아닌 npm이 설치되어 있는 폴더(맥: /usr/local/lib/node_modules)에 설치하는 옵션이다. 이 경로는 보통 `시스템 환경 변수`에 등록되어 있기때문에, 전역 설치한 패키지는 콘솔 명령어로 바로 사용 가능하다. 보통 cli로 쓰려고 설치한다.
- 전역 설치 대신 `npx`를 사용하는 방법도 있다. 전역 설치는 package.json에서 관리되지 않기 때문에 관리가 어렵기 때문이다. 예를들어 rimraf는 아래와 같이 사용한다.

  ```bash
  $npm i --save-dev rimraf
  $npx rimraf node_modules
  ```
- 이렇게 패키지를 devDependencies에 추가하고 npx로 실행하면 전역 설치한 것 과

<br>

### 5.3 패키지 버전 이해하기
Semantic Versioning을 따르는 버전들은 Major.Minor.Patch로 구성된다. 각각 아래와 같은 의미를 지닌다.
- Major: 하위 호환이 되지 않는 변경 사항
- Minor: 하위 호환이 되는 변경 사항
- Patch: 간단한 버그 수정

Major는 하위 호환이 되지 않으므로, 주의를 기울여야한다. minor나 patch 버전 업데이트는 안심하고 버전을 올릴 수 있다.

세자리 버전 외에 `^`, `<`, `>`, ... 등이 추가되는데, 의미는 아래와 같다.

- `^` : minoer 버전까지만 설치하거나 업데이트한다. 예를들어 express@^1.1.1 이라면 1.1.1 이상부터 2.0.0 이전까지의 버전만 설치한다는 의미.
- `~` : patch 버전까지만 설치하거나 업데이트, express@~1.1.1 이라면 1.1.1 이상부터 1.2.0 미만 버전까지만 설치한다는 의미. `^`는 하위 호환을 보장하기 때문에 `^`을 많이 사용한다.
- `>`, `<` `>=`, `<=`, `=`: 알기 쉽게 초과, 미만, 이상, 이하, 동일을 뜻한다.
- `@latest`는 안정된 최신 버전의 패키지를 설치한다는 의미, `@x`와 동일하다.
- `@next` : 가장 최근 배포판을 사용한다. 안정되지 않은 알파나 베타 버전의 패키지를 설치할 수 있다.

<br>

### 5.4 기타 npm 명령어

| 명령어 | 설명 |
|:---:|:---|
|`npm outdated` | 업데이트 할 수 있는 패키지가 있는지 확인한다. 출력에서 `Current`와 `Wanted`가 다르면 업데이트 할 수 있다. |
| `update` | `Wanted`버전으로 패키지를 업데이트한다. |
| `uninstall`, `rm` | 설치한 패키지 제거. | 
| `search` [검색어] | npm에서 패키지를 검색한다. |
| `info` [검색어] | 검색하는 패키지의 의존 관계, 설치 가능한 버전등의 정보를 표시해준다. |
| `adduser` | npm 로그인. |
| `whoami` | npm에 로그인 한 사용자가 누구인지 알려준다. |
| `logout` | npm 로그아웃. |
| `deprecate` [패키지][버전][메시지] | 패키지를 설치할 때 경고 메시지를 띄우게 한다. 자신의 패키지에만 사용 가능하다. |
| `publish` | 패키지를 배포한다. |
| `unpublish` | 배포한 패키지를 제거한다.  24시간 이내에 배포한 패키지만 제거할 수 있다. 이런 제약의 이유는 의존성 관계 때문 |

<br>

## 6. 익스프레스 웹 서버 만들기

### 6.1 익스프레스 프로젝트 시작하기
`express`와 `nodemon`을 설치한다. `nodemon` node monitor의 약자로 개발시 파일이 수정되면 자동으로 노드 애플리케이션을 다시 시작하게 해준다.
```
npm i express
npm i -D nodemon
```
아래와 같이 서버가 될 `app.js`를 작성한다.
```js
// app.js 
const express = require('express');

const app = express();
// process.env.PORT나 3000번 포트에서 서버 실행
app.set('port', process.env.PORT || 3000);

// '/' 경로의 get 요청에 대해 'Hello Express' 응답 반환
app.get('/', (req, res) => {
  res.send('Hello Express');
})

// 3000번 포트 listen
app.listen(app.get('port'), () => {
  console.log(app.get('port'),'번 포트에서 대기중');
})
```
`npm start`/`nodemon app`으로 실행할 수 있다.

`res.sendFile`메서드를 사용하면 파일을 응답할 수 있다.
```js
// ./index.html 파일 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
// ...
```
<br>

### 6.2 자주 사용하는 미들웨어
- `미들웨어`는 익스프레스의 핵심으로, 요청/응답 사이에 위치하는 것들을 말한다. `핸들러`, `라우터` 등은 모두 미들웨어라고 한다. 
- 미들웨어는 `function(req, res, next) {}`형태로, next를 호출하면 다음 미들웨어로 넘어간다. 
- 미들웨어는 `use`, `get`, `post` 등의 메서드로 `app.use(url?, middleware)`의 형태로 적용한다.

<br>

### 6.2.1 morgan
- `morgan`은 request logger 미들웨어로, request 요청에 대한 각종 정보를 콘솔에 출력해준다.
- `dev`, `combined`, `common`, `short`, `tiny`등의 옵션을 쓸 수 있다. 주로 개발에서는 `dev`, 운영에서는 `combined`를 쓴다.
```
$ npm i --save-dev morgan
```
```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

<br>

### 6.2.2 static
- `static` 미들웨어는 정적 파일을 응답할 때 사용하는 미들웨어로 익스프레스에 내장되어 있다.
```js
// /로 요청시 public 폴더의 리소스에 접근하게 된다.
app.use('/', express.static(path.join(__dirname, 'public')));
```
- 해당 경로에 파일이 없으면 자동으로 `next`를 호출하고, 있으면 다음으로 넘어가지 않고 바로 응답한다.

<br>

### 6.2.3 body-parser
- 요청 본문을 해석해 `req.body` 객체로 만들어주는 미들웨어로 익스프레스 4.16.0 이후부터 내장되어 있다.
```js
app.use(express.json());  // json 형식 해석
app.use(express.urlencoded({extended: false})); //URL-encoded 형식 해석
```
- json, URL-encoded 외의 Raw(버퍼 데이터), Text(텍스트 데이터)를 처리할 때는 body parser를 설치하고 아래와 같이 사용한다.
```
npm i body-parser
```

```js
const bodyParser = require('body-parser');
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

<br>

### 6.2.4 cookie-parser
- `cookie-parser`는 요청의 쿠키를 해석해 `req.cookis` 객체로 만든다.
- 유효기간이 지난 쿠키는 알아서 걸러낸다.
- 서명된 쿠키가 있는 경우 `cookie-parser`에 비밀키를 인자로 제공해 해당 쿠키가 내 서버가 만든 쿠키임을 검증할 수 있다. 서명이 붙으면 쿠키가 `key=value.sign` 형태가 된다. 서명된 쿠키는 `req.signedCookies`객체에 들어있다.

```js
const cookieParser = require('cookie-parser');
// app.use(cookieParser(비밀키));
app.use(cookieParser(process.env.COOKIE_SECRET));
```
- 응답에 쿠키 생성/제거는 `res.cookie`, `res.clearCookie` 메서드로 한다. 대충 아래와 같다.

```js
// 쿠키 생성
res.cookie('name', 'motiveko', {
  expires: new Date(Date.now() + 900000),
  httpOnly: true, 
  secure: true
});

// 쿠키 지우기
res.clearCookie('name', 'zerocho', { httpOnly: true, secure: true })
```
-  쿠키를 지울 땐 지우려는 쿠키의 키/값/옵션 모두 일치해야 지워진다.(`expires`, `maxAge`는 일치하지 않아도 됨)
- 쿠키 옵션중 `signed`는 쿠키에 서명을 붙이는 옵션이다. `cookie-parser`에 지정한 비밀키로 서명된다.

<br>

### 6.2.5 express-session
- `express-session`은 세션 관리용 미들웨어로, 로그인세션 등에 사용한다. 세션은 사용자별로 `req.session` 객체 안에 유지된다.
- `session`은 `쿠키`로 관리된다. `express-session`은 사용자에게 쿠키를 보내고 이게 다시 서버에 요청이 올 때 해당 쿠키값으로 세션을 가져오게 되는 원리다.
```js
const session = require('express-session');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie'
}))
```
- `resave`는 요청이 올 때 세션에 수정사항이 없어도 다시 저장할 지
- `saveUninitialized`는 세션에 저장할 내역이 없어도 처음부터 세션을 저장할 지
- `secret`은 세션 쿠키에 사용될 서명용 비밀키, `cookie`는 세션 쿠키 옵션으로, `secure`,`httpOnly`는 가급적 켜고 쓰자.
- `name`은 세션 쿠키 이름으로, 지정하지 않으면 `connect.sid`다.
- 여기엔 없는 `store`옵션이 있는데, 세션을 저장하는 옵션이다. 없으면 기본 메모리 저장인데, 서버 재시작시 세션이 사라지기 때문에 보통 `redis`를 지정한다.
- 참고로 `express-session`이 만들어 보내는 쿠키 값에는 `s%3A` 프리픽스가 붙는다. 이게 있으면 express 썻구나 하고 알면 된다.

<br>

### 6.2.6 미들웨어의 특성 활용하기
- 미들웨어 간의 데이터를 이동하려면 `req` 객체에 담아서 보낸다. 
```js
req.data = '이 데이터는 미들웨어간에 계속 유지되고 요청이 끝나면 사라진다';
```
- key로 `data`를 썼는데, `body`와 같이 다른 미들웨어에서 쓸 수 있는 값을 쓰지 않도록 주의하자. `data`는 안전한가보다.
- `app.set`으로도 데이터 공유가 가능한데, `app.set` 익스프레스 전역에서 사용되므로 사용자(요청) 개개의 값을 공유하기엔 부적절하다.

- 미들웨어 내에 미들웨어를 넣어 미들웨어의 기능을 확장할 수 있다. 
```js
// 익스프레스 실행 환경에 따라 morgan 옵션 변경
app.use((req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
})
```

<br>

### 6.2.7 multer
- `multer`는 이미지, 동영상 등의 ***멀티파트 형식으로 파일 업로드시 사용***하는 미들웨어다.
```js

const path = require('path');
const multer = require('multer');

const upload = multer({
  
  storage: multer.diskStorage({
    // 어디에 저장할것인지
    destination(req, file, done) {
      done(null, 'uploads/'); // uploads 폴더에 저장
    },
    // 무슨 이름으로 저장할 것인지
    filename(req, file, done) {
      // 파일명+현재시간.확장자로 저장
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5*1024*1024}  // 파일 사이즈는 5kb까지만?
});
```
- 위 설정은 `uploads` 폴더가 없을 경우 에러가 난다. `fs`모듈로 서버 실행시 upload 폴더가 없으면 만들어 주는 코드를 추가하자.

```js
const fs = require('fs');
try{
  fs.readdirSync('uploads');
} catch(error) {
  console.error('uploads 폴더가 없어 uploads 폴더 생성함');
  fs.mkdirSync('uploads');
}
```

- 이제 `upload`를 이용해 파일을 업로드 할 수 있다. 
- ***단일 파일 업로드***를 위한 `single` 미들웨어를 라우터 앞에 놓으면 설정에 따라 파일 업로드 후 `req.file` 객체가 생성된다. 여기에는 파일에 대한 여러 정보가 담겨있게된다.

```js
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok')
})
```

- ***키값이 같은 여러 파일 업로드*** 에는 `array`미들웨어를 쓴다. 인자로 전달되는 값은 요청에서 파일들의 key값(input의 name 속성값)이다.
- 업로드 후 `req.files` 객체가 생성된다.
```js
app.post('/upload', upload.array('many'), (req, res) => {
  console.log(req.files, req.body);
  res.send("ok");
})
```

- ***키값이 다른 여러 파일 업로드***에는 `fields` 미들웨어를 사용한다. 미들웨어 인자가 조금 달라진다.
```js
app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]), (req, res) => {
  console.log(req.files, req.body);
  res.send("ok");
})
```
- 역시 업로드 결과 파일에 대한 정보는 `req.files.image1/image2`에 들어 있다

- 특수하게 파일을 업로드 하지 않으면서 multipart 형식을 쓰는 경우 none 미들웨어를 쓴다. 인자는 없고 파일 업로드를 안하기 때문에 파일 정보가 들은 객체도 안생긴다.
```js
app.post('/upload', upload.none(), (req, res) => {
  console.log(req.body);
  res.send('ok')
});
```

<br><br>

### 6.3 Router 객체로 라우팅 분리하기
- `app.get(...)`과 같은 메서드가 라우터인데, 이걸 많이 연결하면 코드가 복잡해진다. 익스프레스에서는 라우터를 분리할 수 있다.
```js
// routes/index.js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Express");
});

module.exports = router;

// routes/user.js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello User");
});

module.exports = router;

// app.js
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use((req, res, next) => {
  res.status(404).send("not found");
});
```
- `index.js`와 `user.js`에 라우터를 만들고 app.js에서 `app.use()` 메서드로 라우터를 연결했다. 각각 `GET '/'`, `GET '/user'`에 연결된다. 
- 마지막엔 not found를 처리할 수 있도록 http 404를 응답하는 미들웨어도 추가했다.
- 라우터에 연결된 미들웨어에서 `next`를 호출하면 라우터에 연결된 나머지 미들웨어를 건너뛴다.
```js
router.get('/', 
  (,,next) => next('route'),
  () => console.log('실행되지 않음'),
  () => console.log('실행되지 않음'),
)
router.get('/', function(req, res){
  console.log('이건 실행됨');
  res.send('Hello Express');
})
```

- 라우터 주소에는 `정규 표현식`, `라우트 매개변수` 등의 특수 패턴을 사용할 수 있다. 
```js
router.get('/user/:id', function(req, res){
  console.log(req.params, req.query);
});

/*
  GET /user/123?limit=5&skip=10
    => { id: '123' } { limit: '5', skip: '10' }
*/
```
- `req.params.`에는 `:id`에 매칭되는 값이 들어있다. id만 참조하려면 `req.params.id`로 참조.
- 주의할 점은 일반 라우터보다 뒤에 위치해야 한다.는 점이다. 다양한 ***라우터를 아우르는 와일드 카드 역할의 라우터는 일반 라우터보다 뒤에 위치해야 한다.***
```js
router.get('/user/:id', function(req, res){
  console.log('얘만 실행된다.');
})
router.get('/user/like', function(req, res){
  console.log('실행되지 않는다.');
})
```

- `router.route()`를 이용하면 코드를 좀 더 간소화 시킬수있다.
```js
router.get('/abc', (req, res) => {
  res.send('...')
})
router.POST('/abc', (req, res) => {
  res.send('...')
})

// router.route를 이용해 좀 더 나은 패턴으로 작성
router.route('/abc')
  .get((req, res) => {
    res.send('...');
  })
  .post((req, res) => {
    res.send('...');
  })
```

<br>

### 6.4 req, res 객체 살보
- 익스프레스의 `req`, `res`는 http 모듈의 req, res 객체를 확장하였다. 자주 쓰이는 것 위주로 알아보자

1. req
- req.app: req 객체를 통해 app 객체에 접근할 수 있다. 
- req.body: body-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체
- req.ip : 요청의 ip주소
- req.params: 라우트 매개변수 정보
- req.query : 쿼리스트링 정보
- req.signedCookies : 서명된 쿠키들은 req.cookies 대신 여기에 담긴다
- req.get('헤더명') : 헤더 정보를 가져올 수 있다.

2. res
- res.app : 앱 객체에 접근
- res.cookie(key, value, option): 쿠키를 설정하는 메서드
- res.clearCookie(key, value, option): 쿠키를 제거하는 메서드
- res.end: 데이터 없이 응답 전송
- res.json(JSON): JSON 형식 응답 전송
- res.redirect(주소): Redirect 응답 전송
- res.render(view, data) : 템플릿 엔진을 랜더링해서 응답할 때 사용
- res.send(data): 데이터와 함께 응답한다.
- res.sendFile(경로) : 경로에 위치한 파일을 응답한다.
- res.set(Header, value): 응답 헤더 설정
- res.status(code): 응답의 HTTP status code 설정

보통 req, res의 메서드는 체이닝하여 사용한다.

<br>

## 7. Mysql
### 7.1 ~ 7.5 - Mysql 설치 및 테이블 생성, CRUD는 생략
```bash
# docker mysql 실행
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql:latest
```

<br>

### 7.6 시퀄라이즈 사용하기

- 시퀄라이즈는 ORM이다. 자바스크립트 객체와 DB의 관계를 맵핑해준다. `sequelize`, `sequelize-cli`, `mysql2`를 설치해준다. `sequelize-cli`는 시퀄라이즈 명령어 실행을 위한 패키지, `mysql2`는 MYSQL과 시퀄리아저를 이어주는 드라이버이다. 설치 후 초기화 해준다.
```bash
# 설치
npm i sequelize sequelize-cli mysql2

# 초기화
npx sequelize init
```
- 여러 폴더와 config파일, index.js 등이 생성된다. `models/index.js`를 아래와 같이 바꿔준다.
```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

module.exports = db;
```

<br>

### 7.6.1 MySQL 연결하기
- 아래 코드를 이용해 express앱에서 mysql과 sequelize를 연동할 수 있다.
```js
// app.js
// ...
const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => console.log("데이터 베이스 연결 성공"))
  .catch((err) => console.error(err));

```
- `config/config.json` 에 실행 프로필별 db 정보를 올바르게 설정해준다.

<br>

### 7.6.2 모델 정의하기
- 상세 내용은 [공식 메뉴얼의 Model Definition 탭](https://sequelize.org/docs/v6/core-concepts/model-basics/#model-definition)을 참고한다.
- 모델 정의는 `sequelize.define()`메서드를 사용하거나 `Sequelize.Model`를 상속하는 클래스를 선언하는 방법 두가지가 있다. 책에서는 클래스 상속 방법을 다룬다.
- 정의한 클래스 내부에는 `static init`과 `static associate`를 작성한다.
  - `static init` 
    - 테이블에 대한 관계 작성, 첫 번째 인수로 컬럼 정의를 작성, 두 번째 인수는 테이블 옵션을 작성한다. 
    - 책에서 `id`컬럼은 알아서 만들어 준다고 하는데 공식문서에는 ID도 다 작성했따. 공식문서가 맞는거같은데..
  - `static associate` : 다른 모델과의 관계 작성
- `seqeulize`에서는 보통 모델은 단수형, 테이블 이름은 복수형으로 사용한다.
- model을 정의한 후 `models/index.js`의 db객체에 아래와 같이 등록해준다. 다른 파일에서 db를 import해서 사용하게 될 것이다.
```js
// models/index.js
db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
```

<br>

### 7.6.3 관계 정의하기
- 상세 내용은 [공식 문서의 Associtaions 탭](https://sequelize.org/docs/v6/core-concepts/assocs/)을 참고하자.
1. 1:N(`HasMany`, `BelongsTo`)
- users와 comments의 관계다. 관계정의는 양방향으로 해줘야한다.(하나보다)
```js
// models/user.js
  // ...
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};
...
```
```js
// models/comment.js
  // ...
  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' })
  }
};
```
- 1인 user는 `hasMany`, N인 comment는 `belongsTo` 메서드를 사용했다.
- `foreignKey`를 따로 지정하지 않으면 `모델명+기본키 컬럼`이 생성된다.(여기서는 UserId)
- 앱을 실행하면 `sequelize.sync`에서 비동기로 쿼리를 날려 모델에 대한 테이블을 생성한다.

<br>

2. 1:1(`hasOne`, `belongsTo`)
- hasMany 대신 hasOne을 사용하고 belongsTo는 똑같다.
```js
db.User.hasOne(db.Info, { foreignKey: 'userId', sourceKey: 'id' });
db.Info.belongsTo(db.User, { foreignKey: 'UserId', targetKey: 'id' })
```
- hasOne과 belongsTo의 차이는 ***`belongsTo`를 사용하는 모델에서 외래키를 관리한다는 점***이다. JPA의 JoinColumn과 같은 개념.

<br>

3. N:M(`belongsToMany`)
- 상세 내용은 [공식 메뉴얼 다대다 관계](https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships)를 참고하자.
- 둘 중 메인 테이블이 없으므로 `belongsToMany`을 사용해서 매핑한다. 
- 예를들어 게시물과 해시태그 테이블의 관계는 아래와 같은 형태로 표현한다.
```js
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
```
- 다대다는 중계 테이블(여기서는 `PostHashtag`)이 생성되고 `postId`, `hashtagId` 컬럼이 생기면서 매핑하게 된다.

<br>

### 7.6.4 쿼리 알아보기
- 상세 내용은 [공식 메뉴얼 Basic Query](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)를 참고하자.
- 시퀄라이즈 쿼리는 `Promise`를 반환한다. 보통 async/await을 붙여서 사용한다.
- 간단한 CRUD를 수행해본다.
1. Create
```js
const { User } = require('../models');
User.create({
  name: 'motiveko',
  age: 32,
  married: false,
  comment: '안녕하세요'
});
```
- `married`는 sequelize에서는 `boolean`으로 생성했고, mysql에서는 `tinyint`로 생성된다. sequelize에서 boolean으로 처리해주면 mysql에서는 0/1로 알아서 들어간다.

<br>

2. Read(`findAll`, `findOne`)
```js
// 전체 조회, SELECT * FROM nodjes.users;
User.findAll({});

// 한개만 조회, SELECT * FROM nodejs.users LIMIT 1;
User.findOne({})

// 원하는 컬럼만 조회, SELECT name, married FROM nodejs.users;
User.findAll({
  attributes: ['name', 'married']
})

// 조건검색,
// SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const { Op } = require('sequelize');
User.findAll({
  attributes: ['name', 'age'],
  where: {
    married: true,
    age: { [Op.gt]: 30 }
  }
})

// SELECT id, name FROM users WHERE married = 0 OR age > 30;
User.findAll({
  attributes: ['id', 'name'],
  where: {
    [Op.or]: [{ married: false }, { age: { [Op.gt]: 30 }}]
  }
})
```
- Op는 각각 `gt`(초과), `gte`(이상), `lt`(미만), `lte`(이하), `ne`(같지 않음), `or`(또는), `in`(in), `notIn`(notIn) 등의 연산자를 제공한다.
- 자세한건 공식메뉴얼을 참고하자.

<br>

3. Update
```js
// UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
  comment: '바꿀내용'
}, {
  where: { id: 2 }
})
```

<br>

4. Delete
```js
// DELETE FROM nodejs.users WHERE id = 2;
User.destroy({
  where: { id: 2 }
})
```

<br>

5. 관계쿼리
- 관계쿼리는 `include` 옵션을 사용하면 된다. User 조회시 Comment까지 조회해보자.
```js
const user = await User.findOne({
  include:[{
    model: Comment,
    where: {
      id: 1
    },
    attributes: ['id']
  }]
});
console.log(user.Comments)
```
- [**include를 안쓰면 LazyLoading, include를 쓰면 Eager Loading**](https://sequelize.org/docs/v6/core-concepts/assocs/#fetching-associations---eager-loading-vs-lazy-loading)이다. 모델 정의 레벨에서 따로 설정하지 않고 조회 쿼리에서 결정한다.
- 관계 설정하면 객체에 편리한 메서드를 제공한다. 책의 문법은 옛날이고 [최신 문법](https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances)을 참고하자. 
- 예를들면 User는 `User.hasMany(Comment)`로 Comment와 관계를 맺으므로 [여기](https://sequelize.org/docs/v6/core-concepts/assocs/#foohasmanybar)에 정의된 메서드를 사용할 수 있다.

6. [SQL 쿼리(Raw Query)](https://sequelize.org/docs/v6/core-concepts/raw-queries/)
- `sequelize.query`메서드를 사용한다.
```js
const [result, metadata] = await sequelize.query('SELECT * from comments');
```

> 템플릿 엔진을 사용하는 예제는 생략한다.

<br>

## 10. 웹 API 서버 만들기
### 10.1 데이터베이스 모델 설정
- `User`, `Post`, `Hashtag` 모델을 만든다. 특이점은 User는 follow 기능에 따라 스스로 N:M 관계를 가진다는 점이다. 아래와 같이 표현한다.
```js
// models/user.js

// ...
  static associate(db) {
    db.User.hasMany(db.Post);

    // 동일 모델에 대한 N:M
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId", // fkey와 as는 반대여야한다!!
      as: "Followers", // User.Followers로 접근 가능
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings", // User.Followings로 접근 가능
      through: "Follow",
    });
  }
  }
```
- 이렇게하면 `Follow`라는 중계 테이블이 생성되고 `followerId` - `followingId` 두개의 컬럼이 생성된다.
- as와 Fkey는 반대로 설정해줘야한다. as가 Followings면 foreignKey는 followerId 이다.
- `sequelize-cli`를 이용하면 SQL 없이 database 생성이 가능하다. `config/config.json`에 db명을 설정하고 아래 명령어를 실행한다.

```bash
npx sequelize db:create

# Sequelize CLI [Node: 16.13.1, CLI: 6.4.1, ORM: 6.19.0]

# Loaded configuration file "config/config.json".
# Using environment "development".
# Database nodebird created.
```

<br>
<!-- config, models, passport 폴더, routes는 auth.js, middlewares.js -->

### 10.2 [passport](https://www.passportjs.org/) 설정
### 10.2.1 인증 flow
- 로그인 전체 과정은 아래와 같다.
  1. 라우터로 로그인 요청 발생
  2. 라우터에서 `passport.authenticate` 메서드 호출
  3. 로그인 수행
  4. 로그인 성공시 사용저 정보 객체와 함께 req.login 호출
  5. req.login 메서드가 passport.serializeUser 호출
  6. req.session에 사용자 아이디 저장
  7. 로그인 완료

- 로그인 이후 인증 과정은 아래와 같다.
  1. 요청 발생
  2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 `passport.deserializeUser` 메서드 호출
  3. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
  4. 조회된 사용자 정보를 req.user에 저장
  5. 라우터에서 req.user 객체 사용 가능

<br>

### 10.2.2 Passport 모듈로 로컬/카카오 로그인 구현

- 관련 패키지(전체) 설치
```bash
npm i passport passport-local passport-kakao bcrypt
```
- ***Passport 모듈을 express에 아래와 같이 연결한다.***
```js
// app.js
//...
const passportConfig = require("./passport");
passportConfig(); // 패스포트 설정

// express-session 미들웨어
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))

app.use(passport.initialize())
app.use(passport.session())
```
- `passport.initialize()` 미들웨어는 요청에 passport설정을 심고, `passport.session()` 미들웨어는 req.session 객체에 passport 정보를 저장한다. req.session 객체는 `express-session` 모듈이 생성하므로, `express-session` 뒤에 passport를 연결해야한다.
- ***패스포트 설정을 아래와 같이 작성한다.***
```js
// passport/index.js
const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  // 로그인시 실행, req.session 객체에 어떤 데이터를 저장할지 정한다.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // passport.session가 매 요청시 실행, req.session에 저장한 id를 인수로 받는다. id를 이용해 db에서 사용자 정보를 조회
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
```
- `passport.serializeUser`는 로그인 시 실행하며, req.session 객체에 어떤 데이터를 저장할지 작성한다. 세션에는 유저의 id만 저장한다.
- `passport.deserializeUser`는 매 요청시 실행되며, req.session에 저장한 id를 인수로 받아 db에서 사용자 정보를 조회한다. 데이터 정합성 등이 중요하기때문에 매번 이렇게 조회한다.
- done의 시그니쳐는 `done(error, data)`로, 첫번째는 에러, 두번째는 성공시 넘겨줄 데이터다.
- ***인증 여부를 확인할 isAuthenticated, isNotAuthenticated 미들웨어 메서드를 아래와 같이 작성한다.***
```js
// routes/middlewares.js

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 되지 않은 사용자');
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다");
    res.redirect(`/?error=${message}`);
  }
}
```
- Passport는 req객체에 `isAuthenticated`메서드를 추가해주는데, 인증된 사용자는 true 아니면 false를 반환한다.
- ***회원가입, 로그인, 로그아웃 라우터를 작성한다.***
```js
// routes/auth.js
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");
const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }

    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      nick,
      password: hash,
    });

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  req.redirect("/");
});

module.exports = router;
```
- 회원가입은  
  1. `isNotLoggedIn` 미들웨어를 사용해 인증되지 않은 사용자를 통과시키고
  2. 요청 email로 사용자 조회 후 사용자가 있으면 다시 가입 페이지로 돌려보내고
  3. 사용자가 없으면 비밀번호를 암호화해 사용자를 등록한다.
- 로그인은
  1. `isNotLoggedIn` 미들웨어를 사용해 인증되지 않은 사용자를 통과시키고
  2. `passport.authenticate('local')` 미들웨어가 로컬 로그인 전략을 수행한다. 처리 결과 콜백은 결국 사용자 요청을 최종 처리하는 미들웨어 역할을 한다. 로컬 전략은 `passport/localStrategy.js`에 등록한다.
- 로그아웃은
  1. req.user 객체를 제거하고
  2. req.session.destroy로 req.session 객체의 내용을 제거하고
  3. 메인 페이지로 사용자를 redirect 시킨다.

- ***로컬 전략을 아래와 같이 작성한다.***
```js
// passport/localStrategy.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ email, password });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
```
- 책에서 사용하는 방법과 공식문서상 방법이 좀 차이가 있다. 둘 다 가능한데, 제대로된 api 명세서가 없어 좀 힘들다.
- https://github.com/jaredhanson/passport-local 를 참고하자.
- `LocalStrategy` 인스턴스는 미들웨어처럼, `passport.use()` 메서드를 이용해 패스포트에 등록한다. 
- 첫 번째 인자는 옵션 요소다. 기본 `{ username, password }`로 인증 요청이 들어 온다고 가정하는데, 이 프로퍼티 명을 원하는데로 바꿀 수 있다. `{ email, password }`로 바꿨다.
- 두번째 인자는 전략을 수행하는 함수로, email과 password로 인증을 처리하고 콜백(done)을 호출한다.
- done의 시그니처는 `done: (error: any, user?: any, options?: IVerifyOptions) => void`로, 인증 성공시 두번째 인자에 user 객체를 넣고, 실패시 첫번재 인자 error를 넘기거나, 여기서는 세번째 인자에 `{message}`를 넣었다.
- `routes/auth.js`의 '/login' 라우터에서 done에 대한 처리를 수행한다.

<br>

- 카카오 로그인도 구현해본다. https://www.passportjs.org/packages/passport-kakao/를 참고하면 된다.
- 기존 작성했던 내용에서 라우터를 추가하고 passport에 kakao strategy 모듈을 추가한다.
```js
// routes/auth.js
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);
```
```js
// passport/kakaoStrategy.js
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");

module.exports = () =>
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("사용자 : ", profile.id);
        try {
          const { id, displayName } = profile;
          const { email } = profile._json.kakao_account;

          const exUser = await User.findOne({
            where: {
              snsId: id,
              provider: "kakao",
            },
          });
          if (!exUser) {
            const newUser = await User.create({
              email,
              nick: displayName,
              snsId: id,
              provider: "kakao",
            });
            return done(null, newUser);
          }

          return done(null, exUser);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
```
- `GET /auth/kakao` -> `302 https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8001%2Fauth%2Fkakao%2Fcallback&client_id=6b9895c139fbe7f92c1ae544686a2c1d` -> `GET /auth/kakao/callback` -> `302 GET /` 순으로 호출된다. 
- 정확하진 않으나 `passport.authenticate('kakao')` 메서드는 내부적으로 요청에 토큰 등의 카카오 인증 관련 정보가 없으면 kauth.kakao.com으로 사용자를 redirect 시키고(callback을 query에 넘겨준다), 토큰이 있으면 이걸 이용해 사용자 정보를 가져오고 우리가 작성한 kakaoStrategy에 구현한 인증 로직을 수행하는걸로 판단된다. `GET /auth/kakao`와 `GET /auth/kakao/callback` 모두 `passport.authenticate('kakao')`를 미들웨어로 등록했는데, 사실 `GET /auth/kakao` 핸들러는 없어도 된다.(실제로 동작한다. 하지만 공식문서에서도 이걸 권장하진 않는다.)
- 기타 카카오 앱 설정은 생략한다.

<br>

### 10.3 도메인 등록 구현
- Api의 사용을 관리할 수 있게 Domain 등록을 구현한다.
- User - Domain은 1:N 관계다. 모델 구현 등은 생략한다. 라우터만 살펴본다
```js
// routes/index.js
//..
const Domain = require("../models/domain");
const { v4: uuidv4 } = require("uuid");
const { body, oneOf, validationResult } = require("express-validator");
const { validatorErrorChecker } = require("../middlewares/validationChecker");

// ..

router.post(
  "/domain",
  isLoggedIn,
  oneOf([body("host").isIP(), body("host").isURL()]),
  body("type").isIn(["free", "premium"]),
  validatorErrorChecker,
  async (req, res, next) => {
    const { id: UserId } = req.user;
    const { host, type } = req.body;
    try {
      await Domain.create({
        UserId,
        host,
        type,
        clientSecret: uuidv4(),
      });

      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// middlewares/validationChecker.js
const { validationResult } = require("express-validator");

exports.validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

```
- [`express-validator`](https://express-validator.github.io/docs/index.html)를 이용해 Spring의 Bean Validation과 같은 기능을 구현했다.
- valiator는 모두 express middleware다. validation 결과 처리하는 로직 역시 `validatorErrorChecker` 미들웨어 함수로 분리했다.

<br>

### 10.4 JWT 토큰 인증
- jwt 기반 인증에는 [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) 패키지를 사용한다.
- jwt 모듈의 `sign`메서드로 토큰을 발행하고, `verify` 메서드로 토큰을 검증한다.
- jwt 검증 및 파싱은 middleware를 분리한다.
```js
// routes/middlewares.js

// ...
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
  }
  return res.status(401).json({
    code: 401,
    message: "유효하지 않은 토큰입니다.",
  });
};

```

- 토큰 발급 api 라우터는 아래와 같다. 환경변수에 비밀키를 저장하고 비밀키를 기반으로 발행한다.
```js
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { validatorErrorChecker } = require("../middlewares/validationChecker");
const Domain = require("../models/domain");
const User = require("../models/user");
const { verifyToken } = require("./middlewares");

router.post(
  "/token",
  body("clientSecret")
    .isUUID()
    .withMessage("올바르지 않은 clientSecret 값입니다."),
  validatorErrorChecker,
  async (req, res, next) => {
    const { clientSecret } = req.body;
    try {
      const domain = await Domain.findOne({
        where: { clientSecret },
        include: {
          model: User,
          attributes: ["nick", "id"],
        },
      });
      if (!domain) {
        return res.status(401).json({
          code: 401,
          message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록해주세요",
        });
      }
      const { id, nick } = domain.User;
      const token = jwt.sign({ id, nick }, process.env.JWT_SECRET, {
        expiresIn: "1m",
        issuer: "motiveko",
      });
      return res.json({
        code: 200,
        message: "토큰이 발급되었습니다",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    }
  }
);
```
- 만약 jwt 토큰 기반 로그인을 구현한다면, 토큰을 쿠키로 전달하고, `isLoggedIn`, `isNotLoggedIn`대신 verifyToken 미들웨어를 사용하면 된다. 세션을 사용하지 않으므로 serializeUser deSerializeUser 메서드는 필요 없다.
- jsonwebtoken의 sign의 기본 알고리즘은 `HS256`으로 단방향 해시 암호화 방식이다. ***만약 클라이언트에서 `sign`, `verify`메서드를 사용하고 싶다면 `RSA`같은 양방향 비대칭 암호화 알고리즘을 사용해야 한다. 서버에서는 비밀키를, 클라이언트에서는 공개키를 사용하므로써 비밀키 유출을 막을 수 있다.*** 자세한 방식은 모르겠으나 공식문서상 PEM 키를 사용하는 부분을 참고하면 된다고 한다.
