var InputField = function(id, label) {
	Field.call(this, id);

	this.input = document.createElement('input');
	this.input.id = id;
	
	this.label = document.createElement('label');
	var labelTextNode = document.createTextNode(label);
	this.label.appendChild(labelTextNode);

	this.element = document.createElement('div');
	this.element.className = 'input-field';
	this.element.appendChild(this.label);
	this.element.appendChild(this.input);

};
extend(InputField, Field);

InputField.prototype.getValue = function() {
	return this.input.value;
}
