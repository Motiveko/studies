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
function a() {
	const res = '리절트입니다.';
	return new Promise((resolve, reject) => {
		
	})
}