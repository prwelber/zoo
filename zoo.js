//zoo code challenge for Dedham Group
console.log('zoo.js connected');


//create Animal constructor
function Animal (name, species, type, climate, gender, age) {
	this.name = name,
	this.species = species,
	this.type = type,
	this.climate = climate,
	this.gender = gender,
	this.age = age,
	this.enclosure,

	this.moveToEnclosure = function (enclosure) {
		console.log('move to enclosure method');
	},

	this.currentEnclosure = function () {
		console.log('This anmial is currently in', this.enclosure);
	}

};

//create animals

var jimi 			= new Animal ("Jimi", "Penguin", "Carnivore", "Polar", "M", 10),
	  steve 		= new Animal ("Steve", "Penguin", "Carnivore", "Polar", "M", 2),
	  janis 		= new Animal ("Janis", "Penguin", "Carnivore", "Polar", "F", 5),

	  peyton 		= new Animal ("Peyton", "Polar Bear", "Carnivore", "Polar", "M", 18),
	  eli 	 		= new Animal ("Eli", "Polar Bear", "Carnivore", "Polar", "M", 10),
	  archie 		= new Animal ("Archie", "Polar Bear", "Carnivore", "Polar", "M", 8),

	  ernest  	= new Animal ("Ernest", "Seal", "Carnivore", "Polar", "M", 2),
	  roberta 	= new Animal ("Roberta", "Seal", "Carnivore", "Polar", "F", 5),
	  roald   	= new Animal ("Roald", "Seal", "Carnivore", "Polar", "M", 3),

	  nelson 		= new Animal ("Nelson", "Giraffe", "Herbivore", "Savannah", "M", 4),
	  winnie 		= new Animal ("Winnie", "Giraffe", "Herbivore", "Savannah", "F", 2),

	  ricky 		= new Animal ("Ricky", "Lion", "Carnivore", "Savannah", "F", 15),

	  enrique 	= new Animal ("Enrique", "Parrot", "Herbivore", "Jungle", "M", 1),
	  michele 	= new Animal ("Michele", "Parrot", "Herbivore", "Jungle", "F", 3),
	  christina = new Animal ("Christina", "Parrot", "Herbivore", "Jungle", "F", 4),

	  landon 		= new Animal ("Landon", "Jaguar", "Carnivore", "Jungle", "M", 6),
	  mia 	 		= new Animal ("Mia", "Jaguar", "Carnivore", "Jungle", "F", 2);

//create Enclosure Constructor

function Enclosure (name, speciesAccepted, climate, type, animals) {
	this.name = name,
	this.speciesAccepted = speciesAccepted,
	this.climate = climate,
	this.type = type,
	this.animals = animals
};

//create enclosures

var polarCarnivores 	 = new Enclosure ("Polar Carnivores", ["Penguin", "Polar Bear", "Seal"], "Polar", "Carnivore", []),
		savannahCarnivores = new Enclosure ("Savannah Carnivores", ["Lion"], "Savannah", "Carnivore", []),
		savannahHerbivores = new Enclosure ("Savannah Herbivores", ["Giraffe"], "Savannah", "Herbivore", []),
		jungleHerbivores	 = new Enclosure ("Jungle Herbivores", ["Parrot"], "Jungle", "Herbivore", []),
		jungleCarnivores	 = new Enclosure ("Jungle Carnivores", ["Jaguar"], "Jungle", "Carnivore", []);

var arrayOfEnclosures = [polarCarnivores, savannahHerbivores, savannahCarnivores, jungleCarnivores, jungleHerbivores];


//populate enclosures
//need to add this to the animal object
var findEnclosure = function findEnclosure (animal, enclosures) {

	for (var i = 0, len = enclosures.length; i < len; i++) {
		if (enclosures[i].speciesAccepted.indexOf(animal.species) >= 0) {
			console.log("the animal is accepted in the enclosure: ", enclosures[i].name);
		}
	}

};





