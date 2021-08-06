# Scope, Nested Functions, and Closures

In JavaScript, only functions have `Scope`. That is to say a variable declared within a function is not accessible outside of that function.

```js
	function foo() {
	  var a = 10;
	 
	  function bar() {
	    a *= 2;
	  }
	   
	  bar(); 
	  return a;
	}




	function foo() {
	  var a = 10;
	 
	  function bar() {
	    a *= 2;
	    return a;
	  }
	   
	  return bar;      
	}

	var baz = foo(); // baz is now a reference to function bar.
	baz(); // returns 20.
	baz(); // returns 40.
	baz(); // returns 80.


	var blat = foo(); // blat is another reference to bar.
	blat(); // returns 20, because a new copy of a is being used. 
```

In the example above, 

```js
	var baz = foo();
	baz();
	baz();
	baz();
```

When the first time it will run all the content in foo(). 
After foo returns, its scope is saved, and only the function that it returns has access to it.


