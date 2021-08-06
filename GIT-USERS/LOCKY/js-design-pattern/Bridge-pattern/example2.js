// Bridging multiple classes together

var Class1 = function(a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
	console.log('Class1 (a)');
	console.log('Class1 (b)');
	console.log('Class1 (c)');

}

var Class2 = function(d) {

	this.d = d;
	console.log('Class2 (d)');
}

var BridgeClass = function(a, b, c, d) {
	this.one = new Class1(a, b, c);
	this.two = new Class2(d);
}