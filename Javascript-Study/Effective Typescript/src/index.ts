function fetchUrl(url: string, callback: (text: string) => void): void {
	// ...
}

const _cache: {[url: string]: string} = {};
function fetchWithCache(url: string, callback: (text: string) => void): void {
	if(url in _cache) {
		callback(_cache[url]);
	} else {
		fetchUrl(url, response => {
			_cache[url] = response;
			callback(response);
		});
	}
}
function fetchPromise(url: string) {
	const res = '리절트입니다.';
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(resolve)
			.catch(reject);
	})
}

fetchPromise('https://naver.com').then(console.log);


function fetchPagesCB() {
	let numDone = 0;
	const responses: string[] = [];
	const done = () => {
		const [respose1, response2, response3] = responses;
    // .. 응답들을 가지고 후처리
	}
  const urls = ['url1','url2','url3'];
  urls.forEach((url, i) => {
    fetchUrl(url, (res) => {
      responses[i] = res;
      numDone ++;
      if(numDone === urls.length) done(); // 마지막 콜백이 처리되면 done() 호출
    })
  })
}
function fetchPages() {
  Promise.all([
    fetch('url1'), fetch('url2'), fetch('url3'),
  ])
  .then((responses) => {/*   후처리... */})
  .catch((e) => console.error(e))
}

const timeout: (millis: number) =>Promise<never> = (millis) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('요청이 너무 오래걸렸어요..'), millis);
  })
}

const fetchWithTimeout:(url: string, millis: number) => Promise<Response> = (url, millis) => {
  return Promise.race([fetch(url), timeout(millis)]);
}

const getNumber = async () => 42; // 타입은 () => Promise<number>