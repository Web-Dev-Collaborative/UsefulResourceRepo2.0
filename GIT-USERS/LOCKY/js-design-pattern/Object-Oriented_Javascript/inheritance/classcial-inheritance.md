# Classcial Inheritance

Fist create the constructor. This should starting with a capital letter.
Within the constructor, use the `this` keyword to create instance attributes. To create methods, add them to the class's `prototype` object, as in `Person.prototype.getName`.

```js
	/* Class Person. */

	function Person(name) {
	  this.name = name;
	}

	Person.prototype.getName = function() {
	  return this.name;
	}

	var reader = new Person('John Smith');
	reader.getName();
```