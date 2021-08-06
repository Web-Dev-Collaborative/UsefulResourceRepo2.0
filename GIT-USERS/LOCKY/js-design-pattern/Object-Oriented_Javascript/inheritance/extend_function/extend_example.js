function Person(name) {
	this.name = name;
}

Person.prototype.getName = function() {
	return this.name;
}

function Author(name, books) {
	//Author.superclass.constructor.call(this, name)
	this.books = books;
}

extend(Author, Person);
Author.prototype.getBooks = function() {
	return this.books;
}

/*
Author.prototype.getName = function() {
	var name = Author.superclass.getName.call(this);
	return name + ', Author of ' + this.getBooks().join(', ');
}
*/