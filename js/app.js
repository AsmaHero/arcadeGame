(function(){



let lives = 5;
let score = 0;
let heartsGained = 0;
let crossed = 0;
let isGameOver = false;

//	lives = document.querySelector('.lives > span'),
	score = document.querySelector('.score > span');

// Enemies our player must avoid
  var Enemy = function Enemy(x,y,s){  //initialize the Enemy object
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x; //x position of enemy
    this.y = y; //y position of enemy
    this.speed = s; //speed of enemey moving across the board
};
const Player = function(){  //initialize the player object

    this.sprite = 'images/char-cat-girl.png';
    this.x = 310; //x position of player when the game load
    this.y = 305; //y position of enemy
    this.h_step = 202; //the length of one step horizontally
    this.v_step = 85;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { //this function when the enemies move , it will capture itspositions and speeds and do something wth it
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505){ //if the enemy moves out the board don't allow him just back his position
      this.x = -100; //to back it from beginning if go out of canvas picture with random speed
      var randomSpeed = Math.floor(Math.random() * 4 + 1); //assign random speed to the enemy
      this.speed = 120 * randomSpeed;
      //(60 + (score > 0 ? score / 20 : score)) * randomSpeed; //this is to move it faster than the random speed
    }

    //how to detect the collition of Enemy by calculating the space arround enemy that max allowed space other than that is a checkCollision
    var eLeftMaxX = this.x - 40;
    var eRightMaxX = this.x + 40;
    var eYTopMax = this.y - 40;
    var eYBottomMax = this.y + 40;
    if(player.x > eLeftMaxX && player.x < eRightMaxX && player.y > eYTopMax && player.y < eYBottomMax ){
      player.resetPosition();
      lives--;
      updateView('you died.'+ lives + ' lives remaining');
      if(lives === 0){
        player.resetPosition();
        isGameOver = true;
        updateView('You died there is no remaining lives!');
				alert('Game is over');
    }


}
};
// Draw the enemy on the screen, required method for game
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function(dt) { //this function when the enemies move , it will capture itspositions and speeds and do something wth it
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505){ //if the enemy moves out the board don't allow him just back his position
      this.x = -100; //to back it from beginning if go out of canvas picture with random speed
    }
};
Player.prototype.resetPosition = function() { //this function when the enemies move , it will capture itspositions and speeds and do something wth it

    this.x = 303;
    this.y = 404;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput = function(direction){

  switch (direction){
    case 'left':
    if (this.x >= this.h_step){
      this.x -= this.h_step;  //to turn the player left by decrease x axis
    }else{
      this.x -= 0;
    }
    break;
    case 'right':
    this.x <= (this.h_step * 5) ? this.x += this.h_step : this.x += 0;
    break;
    case 'up':
    this.y -= this.v_step;
    if(this.y <= 50){
      score += 10;
      crossed++;
      updateView('Congraluation you win the game, your score is : '+score)
      window.gem = new Gem();
      if(crossed % 5 === 0){
        window.heart = new Heart() //to initialize the heart to beginning of the game
        this.resetPosition();
      }
    }
    break;
    case 'down':
    this.y <= (this.v_step * 4) ? this.y += this.v_step : this.y +=0;
    break;


  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const gems = [
  { name: 'Blue Gem' , image: 'images/gemBlue.png' , value: 50},
    { name: 'Green Gem' , image: 'images/gemGreen.png' , value: 20},
      { name: 'Orange Gem' , image: 'images/gemOrange.png' , value: 10},
];

const players = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png',
];

window.player = new Player();
// window.gem = new Gem();
// window.heart = new Heart();
// window.selector = new Selector();

// Now instantiate your objects.
let allEnemies = [];
// Canvas position of created enemies and player x, y, movement
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
	// console.log(allEnemies);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  if(isGameOver){ return;}
    var allowedKeys = { //these number are the keycodes to use in programming and identify it
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
if (allowedKeys[e.keyCode]) {//it will respond if I clickonly these keys to make sure
  player.handleInput(allowedKeys[e.keyCode]) //when the user press any of these keys , it will handle the input
}
});
// toast({html: 'you have'+ lives + 'remaining'});
})()
