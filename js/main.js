

// Config
var world = {

	size: {
		y: 10, // min. 5
		x: 20,
	},

	pixelSize: 64,
};

// Make fields
var field = [];
function makeFields(){
	field = new Array(world.size.y);
	for(var i = 0; i < world.size.y; i++){
		field[i] = new Array(world.size.x);
		for(var j = 0; j < world.size.x; j++){
			var style = "width: " + world.pixelSize + "px; height: " + world.pixelSize + "px;";
			field[i][j] = document.createElement("div");
			field[i][j].setAttribute('style', style);
			field[i][j].setAttribute('class', 'field');
			field[i][j].append(j);
			gameWindow.appendChild(field[i][j]);
		};
	};

}
// Generate world
function generateWorld(){
	for(var i = 0; i < 3; i++){
		for (var j = 0; j < world.size.x; j++) {
			field[i][j].style.background = "lightblue";
		};
	};
	for(var i = 3; i < world.size.y; i++){
		for (var j = 0; j < world.size.x; j++) {
			field[i][j].classList.toggle('dirt');
		};
	};	
}


// Load DOM Elements
gameWindow = document.getElementById('gameWindow');

// CSS Inject
gameWindow.style.width = world.size.x * world.pixelSize + "px";
gameWindow.style.height = world.size.y * world.pixelSize + "px";


//Call all!!!!!!!!!!!!!!
makeFields();
generateWorld();

field[2][0].setAttribute('class', "field");
field[2][0].classList.toggle('carrot');