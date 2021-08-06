// add a method to the function object that can be used to declare methods.

Function.prototype.method = function (name, fn) {
	this.prototype[name] = fn;
};

var Bar = function (value) {
	console.log('this is a bar, create new object ' + value);
};

Bar.method('start', function () {
	console.log('bar function start');
});

Bar.method('stop', function () {
	console.log('bar function stop');
});

var mybar = new Bar('mybar');
mybar.start();
mybar.stop();
