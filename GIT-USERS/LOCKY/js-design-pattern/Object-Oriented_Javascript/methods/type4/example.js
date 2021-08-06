// defines a new class and assigns two methods to the class's prototype property.
//
// 'bar' class

var bar = function (value) {
	console.log('this is a bar, create new object ' + value);
};

// bar.prototype is a object

bar.prototype = {
	start : function() {
		console.log('bar function start');
	},
	stop : function() {
		console.log('bar function stop');
	}
};

var mybar = new bar('mybar');
mybar.start();
mybar.stop();
