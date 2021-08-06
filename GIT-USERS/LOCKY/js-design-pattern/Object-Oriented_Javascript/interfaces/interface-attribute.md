#Interface in JavaScript

## Interfaces with Attribute Checking

In this example, `CompositeForm` declares two interfaces, `Composite` and `FormItem`.  
It does this by adding their names to an array, labeled as `implementsInterfaces`.

Drawback is that you are not ensuring that the class really does implement this interface. You only know if it says it implements it.

```js

	/*
		interface Composite {
			function add(child);
			function remove(child);
			function getChild(index);
		}

		interface FormItem {
			function save();
		}
	 
	 */
	
	var CompositeForm = function(id, method, action) {
		this.implementsInterfaces = ['Composite', 'FormItem'];
		...
	};

	...

	function addForm(formInstance) {
		if(!implements(formInstance, 'Composite', 'FormItem')) {
			throw new Error("Object does not implement a required interface.");
		}
		...

	}

	// The implememnts function, which checks to see if an object declares that it
	// implements the required interfaces.

	// THIS IS THE DRAWBACK OF THIS METHOD

	function implements(object) {
		for(var i = 1; i < arguments.length; i++) {
			var interfaceName = arguments[i];
			var interfaceFound = false;
			for(var j = 0; j < object.implementsInterfaces.length; j++) {
				if(object.implementsInterfaces[j] == interfaceName) {
					interfaceFound = true;
					break;
				}
			}
			if(!interfaceFound {
				return false; // interface not found.
			})
		}
		return true; // all found.
	}

```