var BicycleFactory = {
	createBicycle: function(model) {
		var bicycle;

		switch(model) {
			case 'The Speedster':
				bicycle = new Speedster();
				break;
			case 'The Lowrider':
				bicycle = new Lowrider();
				break;
			case 'The Confort Cruiser':
			default:
				bicycle = new ComfortCruiser();
		}

		console.log('This is a BicycleFactory')

		return bicycle;
	}


}




var BicycleShop = function() {};
BicycleShop.prototype = {
  sellBicycle: function(model) {
    var bicycle = BicycleFactory.createBicycle(model);
    /*
    switch(model) {
      case 'The Speedster':
        bicycle = new Speedster();
        break;
      case 'The Lowrider':
        bicycle = new Lowrider();
        break;
      case 'The Comfort Cruiser':
      default:
        bicycle = new ComfortCruiser();
    }
    */
    console.log('This is a BicycleShop')
    bicycle.assemble();
    bicycle.wash();
    
    return bicycle;
  },
  createBicycle: function(model) {
  	throw new Error('Sorry, the shop can\'t create bicycle')
  }
};


// Speedster and it's actions.


var Speedster = function() {
	console.log('create a Speedster!');
}

Speedster.prototype = {
	assemble: function() {
		console.log('assemble a Speedster!');
	},
	wash: function() {
		console.log('wash a Speedster!');
	},
	ride: function() {
		console.log('ride a Speedster!');
	},
	repair: function() {
		console.log('repair a Speedster!');
	}
}