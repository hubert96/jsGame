
// Config
var world = {

	size: {
		y: 10, // min. 5
		x: 20,
	},

	pixelSize: 64,

	startPos: {
		y: 2,
		x: 2,
	},

};

var inHand = 0;


// Object class
function Object(id, name, className) {
	this.id = id;
	this.name = name;
	this.className = className;
}

// Putting objects on playground function
Object.prototype.putObject = function(){
	var object = document.createElement('div');
	object.setAttribute('data-id', this.id);
	object.setAttribute('data-name', this.name);
	object.setAttribute('class', "object " + this.className);
	object.setAttribute('id', id);
	id++;
	return object;
};

// Declaring objects (id, name, class)
var objects = {
	player: new Object(0, "Player", "player"),
	dirt: new Object(1, "Dirt", "dirt"),
	carrot: new Object(2, "Carrot", "carrot")
};


function brokenObj(){
	var brokenObject = document.createElement('div');
	brokenObject.setAttribute('class', "objectBroken");
	var brokenObjectImg = document.createElement('img');
	brokenObjectImg.setAttribute('src', "images/broken.png");

	return brokenObject;
}

// Declaring section
var promptArea = document.createElement('div');
var ObjectNiszcz;

var field = []; // Fields
var inventoryField = []; // Inventory Fields
var id = 1000; // First id



// Make fields
function makeFields(){
	field = new Array(world.size.y);
	for(var i = 0; i < world.size.y; i++){
		field[i] = new Array(world.size.x);
		for(var j = 0; j < world.size.x; j++){
			var style = "width: " + world.pixelSize + "px; height: " + world.pixelSize + "px;";
			field[i][j] = document.createElement("div");
			field[i][j].setAttribute("style", style);
			field[i][j].setAttribute("class", "field");
			//field[i][j].append(i);
			gameWindow.appendChild(field[i][j]);
		}
	}
}

// Generate world
function generateWorld(){
	for(var i = 3; i < world.size.y; i++){
		for(var j = 0; j < world.size.x; j++){
			field[i][j].appendChild(objects.dirt.putObject());
		}
	}
	field[2][1].appendChild(objects.dirt.putObject());
	field[1][1].appendChild(objects.dirt.putObject());
	field[2][6].appendChild(objects.dirt.putObject());
	field[3][4].removeChild(field[3][4].firstChild);
	field[3][10].removeChild(field[3][10].firstChild);
}


// Load DOM Elements
gameWindow = document.getElementById('gameWindow');
inventoryPanel = document.getElementById('inventoryPanel');

// CSS Inject
gameWindow.style.width = world.size.x * world.pixelSize + "px";
gameWindow.style.height = world.size.y * world.pixelSize + "px";
inventoryPanel.style.width = world.size.x * world.pixelSize + "px";

//Call all!!!!!!!!!!!!!!
makeFields();
field[world.startPos.y][world.startPos.x].appendChild(objects.player.putObject()); // Make player
generateWorld(); // World generate function
createInventoryPanel(); // Inventory panel generate
addObjectsListeners(); // Add listeners to objects on map



var player = { // Player Config
	object: document.getElementById('1000'),
	pos: {
		y: world.startPos.y,
		x: world.startPos.x,
	inMove: false,
	moveTimeout: 1
	},
	movePlayer: function(direction){ // Movement
		var self = this;
		switch(direction){
			case "left":
				self.inMove = true;  // set flag, player is in the move
				if(self.pos.x == 0){
					setTimeout(function(){
							self.inMove = false; 
						}, self.moveTimeout);
					return 0;
				} // if left end of map do nothing
				if(field[self.pos.y][self.pos.x-1].hasChildNodes()){ // if solid on the left
					if(field[self.pos.y-1][self.pos.x-1].hasChildNodes()){ // if solid on the left top do nth
						setTimeout(function(){
							self.inMove = false; 
						}, self.moveTimeout);
						return 0;
					} 
					else {	// set player on the left solid
						self.pos.x -= 1;
						self.pos.y -= 1;
						field[self.pos.y][self.pos.x].appendChild(player.object);
						self.object.classList.add('moveLeftTop'); // add animation class
						setTimeout(function(){
							self.object.classList.remove('moveLeftTop'); // remove animation class
							self.inMove = false; 
						}, self.moveTimeout);
						return 1;
					}
				}

				if(!field[self.pos.y+1][self.pos.x-1].hasChildNodes()){ // if no solid on left bottom 
					self.object.classList.add('moveLeft'); // add animation class
					self.pos.x -= 1;
					field[self.pos.y][self.pos.x].appendChild(player.object);
					setTimeout(function(){
						self.object.classList.remove('moveLeft'); // remove animation class
						player.movePlayer('bottom');
					}, self.moveTimeout);
					return 1;
				}
				
				else { // go left
					self.object.classList.add('moveLeft'); // add animation class
					self.pos.x -= 1;
					field[self.pos.y][self.pos.x].appendChild(player.object);
					setTimeout(function(){
						self.object.classList.remove('moveLeft'); // remove animation class
						self.inMove = false; 
					}, self.moveTimeout);
					return 1;
				}
				break;
			case "right":
				self.inMove = true;  // set flag, player is in the move
				if(self.pos.x == world.size.x-1){
					setTimeout(function(){
							self.inMove = false; 
						}, self.moveTimeout);
					return 0;
				} // if right end of map do nth
				if(field[self.pos.y][self.pos.x+1].hasChildNodes()) // if solid on the right
					if(field[self.pos.y-1][self.pos.x+1].hasChildNodes()){ // if solid on the right top do nth
						setTimeout(function(){
							self.inMove = false; 
						}, self.moveTimeout);
						return 0;
					} 
					else { // set player on the right solid
						self.pos.x += 1;
						self.pos.y -= 1;
						field[self.pos.y][self.pos.x].appendChild(player.object);
						self.object.classList.add('moveRightTop'); // add animation class
						setTimeout(function(){
							self.object.classList.remove('moveRightTop'); // remove animation class
							self.inMove = false; 
						}, self.moveTimeout);
						return 1;
					}

				if(!field[self.pos.y+1][self.pos.x+1].hasChildNodes()){ // if no solid on RIGHT bottom 
					self.pos.x += 1;
					field[self.pos.y][self.pos.x].appendChild(player.object);
					self.object.classList.add('moveRight'); // add animation class
					setTimeout(function(){
						self.object.classList.remove('moveRight'); // remove animation class
						player.movePlayer('bottom');
					}, self.moveTimeout);
					return 1;
				}

				else{
					self.pos.x += 1;
					field[self.pos.y][self.pos.x].appendChild(player.object);
					self.object.classList.add('moveRight'); // add animation class
					setTimeout(function(){
						self.object.classList.remove('moveRight'); // remove animation class
						self.inMove = false; 
					}, self.moveTimeout);
					return 1;
				}	// go right
			case "bottom":
				self.inMove = true;  // set flag, player is in the move
				if(!field[self.pos.y+1][self.pos.x].hasChildNodes()){
					self.pos.y += 1;
					field[self.pos.y][self.pos.x].appendChild(player.object);
					self.object.classList.add('moveBottom'); // add animation class	
					setTimeout(function(){
						self.object.classList.remove('moveBottom'); // remove animation class
						player.movePlayer('bottom');
					}, self.moveTimeout);
				} else {
					self.inMove = false;
					return 0;	
				}
		}
	}  
};
player.moveTimeout = 300; // IMPORTANT, value must be the same with player move animation duration!!!
player.inMove = false; // i have to move this two assigments!!


document.addEventListener('keydown', function(key){  // movement listeners & actions
	switch(key.keyCode){
		case 37:
			if(player.inMove == false){ // can only fire when player isn't moving
				player.movePlayer("left"); // move left function call
				//giveHimLight();
			}
			break;

		case 39:
			if(player.inMove == false){ // can only fire when player isn't moving
				player.movePlayer("right"); // move right function call
				//giveHimLight();
			}
			break;
	}
});


function giveHimLight(){ // not finished yet

	var y = player.pos.y;
	var x = player.pos.x;

	var closestBlocks = [
			field[y-1][x],
			field[y-1][x+1],
			field[y][x+1],
			field[y+1][x+1],
			field[y+1][x],
			field[y+1][x-1],
			field[y][x-1],
			field[y-1][x-1]];

	closestBlocks.forEach(function(element){
		if(element.hasChildNodes()){
			element.addEventListener('mouseover', function(){
				element.style.filter = "brightness(110%)";			
						});
			element.addEventListener('mouseout', function(){
				element.style.filter = "";			
						});
		}
	});
}


function addObjectsListeners(){ // Object reactions to click/ hover / hold
	field.forEach(function(element1, index){
		field[index].forEach(function(element2, index){
			if(element2.hasChildNodes() && element2.firstChild != document.getElementById(1000)){
				var currentField = element2;
				var currentObjectId = element2.firstChild.getAttribute("id");
				var currentObject = document.getElementById(currentObjectId);
				currentObject.addEventListener('mouseover', objectMouseover);
				currentObject.addEventListener('mousedown', objectMouseDown);
				currentObject.addEventListener('mouseup', objectMouseUp);
				currentObject.addEventListener('mouseout', objectMouseOut);
			}
		});
	});	
}

function addNonObjectsListeners(){ // Listeners to placing objects on the playground
	field.forEach(function(element1, index){
		field[index].forEach(function(element2, index){
			if(!element2.hasChildNodes()){
				var currentField = element2;
				currentField.addEventListener('mouseover', objectMouseover);
				currentField.addEventListener('click', function(){
					if(inHand != 0){
						currentField.appendChild(inHand);
						var currentObject = currentField.firstChild;
						currentObject.addEventListener('mouseover', objectMouseover);
						currentObject.addEventListener('mousedown', objectMouseDown);
						currentObject.addEventListener('mouseup', objectMouseUp);
						currentObject.addEventListener('mouseout', objectMouseOut);
						inHand = 0;
					}
				});
				currentField.addEventListener('mouseout', objectMouseOut);
			}
		});
	});	
}


function objectMouseover(){
	this.style.filter = "brightness(110%)";
	prompt('Click & hold to obtain object');
}

function objectMouseDown(){
	var self = this;
	this.appendChild(brokenObj());
	ObjectNiszcz = setTimeout(function(){
		self.removeEventListener('mouseover', objectMouseover);
		self.removeEventListener('mousedown', objectMouseDown);
		self.removeEventListener('mouseup', objectMouseUp);
		self.removeEventListener('mouseout', objectMouseOut);
		self.removeChild(self.firstChild);
		self.addEventListener('click', function(){
			inHand = self;
			});
		for(var j = 0; j < world.size.x; j++){
			if(!inventoryField[j].hasChildNodes()){
				inventoryField[j].appendChild(self);
				addNonObjectsListeners();
				prompt('Good Job!');
				player.movePlayer("bottom"); // if removed object is under player, move player down
				return 0;
			}
		}
	}, 500);
	prompt('Now hold!');
}


function objectMouseUp(){
	this.style.filter = "brightness(110%)";
	this.removeChild(this.firstChild);
	clearTimeout(ObjectNiszcz);
	prompt('Try to hold longer!');
}

function objectMouseOut(){
	this.style.filter = "";
	prompt('Lets get another one object!');
}


function prompt(text){
	promptArea.innerHTML = text;
	promptArea.setAttribute('class', 'prompt');
	promptArea.setAttribute('style', 'top: ');
	gameWindow.appendChild(promptArea);
}

function createInventoryPanel(){
	for(var j = 0; j < world.size.x; j++){
		var fieldStyle = "width: " + world.pixelSize + "px; height: " + world.pixelSize + "px;";
			inventoryField[j] = document.createElement("div");
			inventoryField[j].setAttribute("style", fieldStyle);
			inventoryField[j].setAttribute("class", "field");
			inventoryPanel.appendChild(inventoryField[j]);
	}
}




