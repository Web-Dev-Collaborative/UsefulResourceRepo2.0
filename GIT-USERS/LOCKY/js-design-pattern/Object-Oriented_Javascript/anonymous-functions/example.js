/* anonymous function, executed immediately. */

(function () {
	var foo = 10, bar = 2;
	console.log(foo * bar);
}());


/* anonymous function with arguments. */

(function (foo, bar) {
	console.log(foo * bar);
}(10, 2));


/* anonymous function that returns a value */

var baz = (function (foo, bar) {
	return foo * bar;
}(10, 2));

console.log(baz);


/* anonymous function used as a closure */

var baz;

(function () {
	var foo = 10, 
		bar = 2;
	baz = function () {
		return foo * bar;
	};
}());

baz();