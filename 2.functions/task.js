//Задача № 1
function cachingDecoratorNew(func) {
	let cache = [];

	function wrapper(...args) {
		let hash = md5(args);

		let objectIbCache = cache.find(item => item.hash === hash);

		if (objectIbCache) {
			console.log("Из кеша: " + objectIbCache.value);
			return "Из кеша: " + objectIbCache.value;
		}

		let result = func(...args);

		cache.push({
			hash: hash,
			value: result
		});

		if (cache.length > 5) {
			cache.shift();
		}

		console.log("Вычисляем: " + result);
		return "Вычисляем: " + result;
	}

	return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
	let timeoutId;
	let firstCall = true;

	function wrapper(...args) {
		wrapper.allCount++;

		if (firstCall) {
			firstCall = false;

			func.call(this, ...args);
			wrapper.count++;

			return;
		}

		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.call(this, ...args);
			wrapper.count++;

			timeoutId = null;
		}, delay);
	}

	wrapper.count = 0;
	wrapper.allCount = 0;

	return wrapper;
}
