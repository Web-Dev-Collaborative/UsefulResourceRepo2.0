
// equals to 'foo' object

var foo = {
	x : 100, 
	y : 200,
	f: function (value) {
		console.log('I am inside foo.f(), the value is ' + value);
	}
};

foo.x;
foo.y;
foo.f('test');
