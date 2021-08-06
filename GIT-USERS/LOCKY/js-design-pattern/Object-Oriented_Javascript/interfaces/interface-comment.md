# Interface in JavaScript 

## Describing interfaces with comments

`interface` and `implements` keywords are used but are commented out.

```js
	/*
		interface Composite {
			function add(child);
			function remove(child);
			function getChild(child);
		}
	
		interface FormItem {
			function save();
		}
	*/


	var CompositeForm = function (id, method, action){
		...
	};

	//Implement the Composite interface.

	CompositeForm.prototype.add = function(child) {
		...
	};

	CompositeForm.prototype.remove = function(child) {
		...
	};

	CompositeForm.prototype.getChild = function(child) {
		...
	};

	//Implement the FormItem interface.

	CompositeForm.prototype.save = function() {
		...
	};
```