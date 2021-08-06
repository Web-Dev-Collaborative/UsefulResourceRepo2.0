// modifying Function.prototype.method to allow it to be chained

Function.prototype.method = function (name, fn) {
	this.prototype[name] = fn;
	return this;
};

var Bar = function (value) {
	console.log('this is a bar, create new object ' + value);
};

Bar.
	method('start', function () {
		console.log('bar function start');
	}).
	method('stop', function () {
		console.log('bar function stop');
	});

var mybar = new Bar('mybar');
mybar.start();
mybar.stop();