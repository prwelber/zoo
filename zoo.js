//zoo code challenge for Dedham Group
console.log('zoo.js connected');

//create Enclosure constructor
function Enclosure (name, speciesAccepted, climate, type, animals) {
	this.name = name,
	this.speciesAccepted = speciesAccepted,
	this.climate = climate,
	this.type = type,
	this.animals = animals
};

//create enclosures and array of all enclosures
var polarCarnivores 	 = new Enclosure ("Polar Carnivores", ["Penguin", "Polar Bear", "Seal"], "Polar", "Carnivore", []),
		savannahCarnivores = new Enclosure ("Savannah Carnivores", ["Lion"], "Savannah", "Carnivore", []),
		savannahHerbivores = new Enclosure ("Savannah Herbivores", ["Giraffe"], "Savannah", "Herbivore", []),
		jungleHerbivores	 = new Enclosure ("Jungle Herbivores", ["Parrot"], "Jungle", "Herbivore", []),
		jungleCarnivores	 = new Enclosure ("Jungle Carnivores", ["Jaguar"], "Jungle", "Carnivore", []),
 		arrayOfEnclosures  = [polarCarnivores, savannahHerbivores, savannahCarnivores, jungleCarnivores, jungleHerbivores];


//create Animal constructor
function Animal (name, species, type, climate, gender, age) {
	this.name = name,
	this.species = species,
	this.type = type,
	this.climate = climate,
	this.gender = gender,
	this.age = age,
	this.enclosure,

	//findEnclosure method will log out an enclosure where the animal is accepted
	this.findEnclosure = function () {
		for (var i = 0, len = arrayOfEnclosures.length; i < len; i++) {
			if (arrayOfEnclosures[i].speciesAccepted.indexOf(this.species) >= 0) {
				console.log(this.name + ' the ' + this.species + " is accepted in the enclosure: " + arrayOfEnclosures[i].name);
				return arrayOfEnclosures[i];
			}
		}
	},
	//moveToEnclosure method will move the animal to the specified enclosure, takes enclosure as param
	this.moveToEnclosure = function (enclosure) {
		if (this.climate === enclosure.climate && this.type === enclosure.type) {
			enclosure.animals.push(this);
			this.enclosure = enclosure;
			console.log(this.name + ' has been moved to', this.enclosure.name);
		} else {
			console.log('Sorry, ' +this.name+ " the " +this.species+ ' cannot be moved to that enclosure.');
		}
	},
	//currentEnclosure will log if animal is in an enclosure and which one, or if they are not yet contained
	this.currentEnclosure = function () {
		if (this.enclosure === undefined) {
			console.log("This animal is not in an enclosure.");
		} else {
			console.log('This anmial is currently in', this.enclosure.name);
		}
	},
	this.removeFromEnclosure = function () {
		if (this.enclosure) {
			var index = this.enclosure.animals.indexOf(this);
			this.enclosure.animals.splice(index, 1);
			this.enclosure = undefined;
			console.log(this.name + " has been removed");
		} else {
			console.log('The animal is not in an enclosure yet. Run moveToEnclosure(enclosureName).')
		}
	}

};

//create animals and array of all animal objects
var jimi 					 = new Animal ("Jimi", "Penguin", "Carnivore", "Polar", "M", 10),
	  steve 				 = new Animal ("Steve", "Penguin", "Carnivore", "Polar", "M", 2),
	  janis 				 = new Animal ("Janis", "Penguin", "Carnivore", "Polar", "F", 5),
	  peyton 				 = new Animal ("Peyton", "Polar Bear", "Carnivore", "Polar", "M", 18),
	  eli 	 				 = new Animal ("Eli", "Polar Bear", "Carnivore", "Polar", "M", 10),
	  archie 				 = new Animal ("Archie", "Polar Bear", "Carnivore", "Polar", "M", 8),
	  ernest  			 = new Animal ("Ernest", "Seal", "Carnivore", "Polar", "M", 2),
	  roberta 			 = new Animal ("Roberta", "Seal", "Carnivore", "Polar", "F", 5),
	  roald   			 = new Animal ("Roald", "Seal", "Carnivore", "Polar", "M", 3),
	  nelson 				 = new Animal ("Nelson", "Giraffe", "Herbivore", "Savannah", "M", 4),
	  winnie 				 = new Animal ("Winnie", "Giraffe", "Herbivore", "Savannah", "F", 2),
	  ricky 				 = new Animal ("Ricky", "Lion", "Carnivore", "Savannah", "F", 15),
	  enrique 			 = new Animal ("Enrique", "Parrot", "Herbivore", "Jungle", "M", 1),
	  michele 			 = new Animal ("Michele", "Parrot", "Herbivore", "Jungle", "F", 3),
	  christina 		 = new Animal ("Christina", "Parrot", "Herbivore", "Jungle", "F", 4),
	  landon 				 = new Animal ("Landon", "Jaguar", "Carnivore", "Jungle", "M", 6),
	  mia 	 				 = new Animal ("Mia", "Jaguar", "Carnivore", "Jungle", "F", 2),
	  arrayOfAnimals = [jimi, steve, janis, peyton, eli, archie, ernest, roberta, roald, nelson, winnie, ricky, enrique, michele, christina, landon, mia];



//populate enclosures master function
var populateEverything = function populateEverything () {
	arrayOfAnimals.forEach(animal => animal.moveToEnclosure(animal.findEnclosure()));
};


//help is immediately invoked for the user
var help = function help () {
	console.log('Welcome to the zoo. To inspect an animal, simply type their name. Each animal has four methods: findEnclosure(), moveToEnclosure(enclosure), currentEnclosure(), and removeFromEnclosure(). To inspect an enclosure, type the name. If you have moved some animals around and want to see what animals are in the enclosure, type nameofenclosure.animals');
}();

