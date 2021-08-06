# Private Members Through Closures

Any method that needs to access these variables and functions need only be declared within `Book`. These are called `privileged` methods because they are public but have access to private attributes and methods.
The `this`keyword is used in front of these privileged functions to make them publicly accessible.
Because these methods are defined within the `Book` constructor's scope, they can access the private attributes.
They are not referred to using `this` because they aren't public.

Any public method that does not need direct access to private attributes can be declared normally in the `Book.prototype`.


```js
	var Book = function(newIsbn, newTitle, newAuthor) { // implements Publication

	  // Private attributes.
	  var isbn, title, author;

	  // Private method.
	  function checkIsbn(isbn) {
	    ... 
	  }  

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
	  this.setIsbn(newIsbn);
	  this.setTitle(newTitle);
	  this.setAuthor(newAuthor);
	};

	// Public, non-privileged methods.
	Book.prototype = {
	  display: function() {
	    ...
	  }
	};
```