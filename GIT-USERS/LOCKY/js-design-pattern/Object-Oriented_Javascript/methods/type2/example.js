// defines a class let you create objects
// 
// 'bar' class

var Bar = function (value) {
	console.log('this is a bar, create new object ' + value);
};

Bar.prototype.start = function () {
	console.log('bar function start');
};

Bar.prototype.stop = function () {
	console.log('bar function stop');
};

var mybar = new Bar('mybar');
mybar.start();
mybar.stop();


