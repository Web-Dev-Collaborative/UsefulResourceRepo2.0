# The interface class

```js
	// Constructor.

	var Interface = function(name, methods) {
	    if(arguments.length != 2) {
	        throw new Error("Interface constructor called with " + arguments.length
	          + "arguments, but expected exactly 2.");
	    }
	    
	    this.name = name;
	    this.methods = [];
	    for(var i = 0, len = methods.length; i < len; i++) {
	        if(typeof methods[i] !== 'string') {
	            throw new Error("Interface constructor expects method names to be " 
	              + "passed in as a string.");
	        }
	        this.methods.push(methods[i]);        
	    }    
	};    

	// Static class method.

	Interface.ensureImplements = function(object) {
	    if(arguments.length < 2) {
	        throw new Error("Function Interface.ensureImplements called with " + 
	          arguments.length  + "arguments, but expected at least 2.");
	    }

	    for(var i = 1, len = arguments.length; i < len; i++) {
	        var interface = arguments[i];
	        if(interface.constructor !== Interface) {
	            throw new Error("Function Interface.ensureImplements expects arguments "   
	              + "two and above to be instances of Interface.");
	        }
	        
	        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
	            var method = interface.methods[j];
	            if(!object[method] || typeof object[method] !== 'function') {
	                throw new Error("Function Interface.ensureImplements: object " 
	                  + "does not implement the " + interface.name 
	                  + " interface. Method " + method + " was not found.");
	            }
	        }
	    } 
	};

```


## When use the interface class

In large project, with many different programmers writing code, interfaces are essential.



#Example

```js
	// ResultFormatter class, before we implement interface checking.

	var ResultFormatter = function(resultsObject) {
	  if(!(resultsObject instanceOf TestResult)) {
	    throw new Error('ResultsFormatter: constructor requires an instance '
	      + 'of TestResult as an argument.');
	  }
	  this.resultsObject = resultsObject;
	};

	ResultFormatter.prototype.renderResults = function() {
	  var dateOfTest = this.resultsObject.getDate();
	  var resultsArray = this.resultsObject.getResults();
	  
	  var resultsContainer = document.createElement('div');

	  var resultsHeader = document.createElement('h3');
	  resultsHeader.innerHTML = 'Test Results from ' + dateOfTest.toUTCString();
	  resultsContainer.appendChild(resultsHeader);
	  
	  var resultsList = document.createElement('ul');
	  resultsContainer.appendChild(resultsList);
	  
	  for(var i = 0, len = resultsArray.length; i < len; i++) {
	    var listItem = document.createElement('li');
	    listItem.innerHTML = resultsArray[i];
	    resultsList.appendChild(listItem);
	  }
	  
	  return resultsContainer;
	};


	// ResultSet Interface.

	var ResultSet = new Interface('ResultSet', ['getDate', 'getResults']);

	// ResultFormatter class, after adding Interface checking.

	var ResultFormatter = function(resultsObject) {
	  Interface.ensureImplements(resultsObject, ResultSet);
	  this.resultsObject = resultsObject;
	};

	ResultFormatter.prototype.renderResults = function() {
	  ...
	};
```

#Patterns that rely on the interface


- The factory pattern

- The composite pattern

- The decorator pattern

- The command pattern

