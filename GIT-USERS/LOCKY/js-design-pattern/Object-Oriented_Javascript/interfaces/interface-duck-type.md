#Interface in JavaScript 

##Interfaces with Duck Typing

It doesn't matter whether a class declares the interfaces it supports, as long as the required methods are in place.

```js
	
	// Interfaces
	
	var Composite = new Interface('Composite', ['add', 'remove', 'getChild'])
	var FormItem = new Interface('FormItem', ['save']);

	// CompositeForm class

	var CompositeForm = function(id, method, action) {
		...
	};

	...

	function addForm(formInstance) {
		ensureImplements(formInstance, Composite, FormItem);

		// This function will throw an error if a required method is not implemented.

		// ensureImplements first argument is the object you want to check.
	}