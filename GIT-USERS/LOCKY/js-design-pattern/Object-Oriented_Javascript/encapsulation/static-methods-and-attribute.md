# Static Methods and Attributes

Private and privileged members are still declared within the constructor, using `var` and `this` respectively, but the constructor is changed from a normal function to a nested funciton that gets returned to the variable `Book`.
This makes it possible to create a closure where you can declare private atatic members. The empty parentheses after the funciton declaration are extremely important.

In this example `checkIsbn` method is static because there is no point in creating a new copy of it for each instance of `Book`.

There is also a static attribute called `numOfBooks`, which allows you to keep track of how many times the `Book` constructor has been called.

Public static members are much easier to create. They are simply created directly off the constructor, as with the previous method `convertToTitleCase`.


```js
	var Book = (function() {
	  
	  // Private static attributes.
	  var numOfBooks = 0;

	  // Private static method.
	  function checkIsbn(isbn) {
	    ... 
	  }    

	  // Return the constructor.
	  return function(newIsbn, newTitle, newAuthor) { // implements Publication

	    // Private attributes.
	    var isbn, title, author;

	    // Privileged methods.
	    this.getIsbn = function() {
	      return isbn;
	    };
	    this.setIsbn = function(newIsbn) {
	      if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
	      isbn = newIsbn;
	    };

	    this.getTitle = function() {
	      return title;
	    };
	    this.setTitle = function(newTitle) {
	      title = newTitle || 'No title specified';
	    };

	    this.getAuthor = function() {
	      return author;
	    };
	    this.setAuthor = function(newAuthor) {
	      author = newAuthor || 'No author specified';
	    };

	    // Constructor code.
	    numOfBooks++; // Keep track of how many Books have been instantiated
	                  // with the private static attribute.
	    if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be '
	        + 'created.');

	    this.setIsbn(newIsbn);
	    this.setTitle(newTitle);
	    this.setAuthor(newAuthor);
	  }
	})();

	// Public static method.
	Book.convertToTitleCase = function(inputString) {
	  ...
	};

	// Public, non-privileged methods.
	Book.prototype = {
	  display: function() {
	    ...
	  }
	};
```
