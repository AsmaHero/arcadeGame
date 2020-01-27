
var importedt = document.createElement('script');
importedt.src = 'js/toast.js';
document.head.appendChild(importedt);

function updateView(text){
  iqwerty.toast.Toast(text);
}
let isGameOver = false;
let lives = 3;
let crossed = 0;
class Character {
  // Pass in parameters to control character speed and location
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = '';
  }

  // Draw the character on the canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// character subclass for enemies
class Enemy extends Character {

  // Take same parameters as parent class, but use specific sprite
  constructor(x, y, speed) {
    super(x, y, speed); // to call the parent class and add character image
    this.sprite = 'images/enemy-bug.png';
  }

  // Control changes to the enemy when stuff happens
  update(dt) {


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 410){ //if the enemy moves out the board don't allow him just back his position
      this.x = -100; //to back it from beginning if go out of canvas picture with random speed
    var randomSpeed = Math.floor(Math.random() * 4 + 1); //assign random speed to the enemy
      this.speed = 120 * randomSpeed;
      //(60 + (score > 0 ? score / 20 : score)) * randomSpeed; //this is to move it faster than the random speed
    }

    //how to detect the collition of Enemy by calculating the space arround enemy that max allowed space other than that is a checkCollision
    var eLeftMaxX = this.x - 30;
    var eRightMaxX = this.x + 30;
    var eYTopMax = this.y - 30;
    var eYBottomMax = this.y + 30;
    if(player.x > eLeftMaxX && player.x < eRightMaxX && player.y > eYTopMax && player.y < eYBottomMax ){
      lives--;
      updateView('you died.'+ lives + ' lives remaining');
      player.resetPosition();
      if (lives === 0){
        updateView('You died there is no remaining lives!');
        alert('Game is over');
        player.resetPosition();
        isGameOver = true;
      }
}

}


}

// Sprite subclass for player
class Player extends Character {

  // Take same parameters as parent class, but use specific sprite
  constructor(x, y, speed) {
    super(x, y, speed);
    this.sprite = 'images/char-boy.png';

  }

  // Default function for updating
  update() {}
  resetPosition(){
    this.x = 303;
    this.y = 404;
  }

  // When the player reaches the water, speed up enemies
  greatSuccess() {
    speedUp += 25;
    this.startingX = 200;
    this.startingY = 380;
    this.x = this.startingX;
    this.y = this.startingY;
    player.resetPosition();
    alert('Congraluation you cross and win, you will go to the next level');
  }
  // Start over once the player reaches the water
   resetGame() {
     this.startingX = 200;
     this.startingY = 380;
     this.x = this.startingX;
     this.y = this.startingY;
     player.resetPosition();
   }

  // Player controls
  handleInput(allowedKeys) {
    switch (allowedKeys) {

      // Left arrow key pressed
      case "left":
        // Don't allow movement past left edge
        if (this.x > 0) {
          this.x -= 101;
        }
        break;

      // Right arrow key pressed
      case "right":
        // Don't allow movement past right edge
        if (this.x < 402) {
          this.x += 101;
        }
        break;

      // Up arrow key pressed
      case "up":
      console.log(this.y);
        // if cross to the top without collection game end
        if (this.y <= 72) {
          this.y -= 83;
            crossed++;
            console.log(this.y);
            setTimeout(this.greatSuccess,100);
        }else {
          this.y -= 83;
        }
        break;

      // Down arrow key pressed
      case "down":
        // Don't allow movement past bottom edge
        if (this.y < 350) {
          this.y += 83;
        }
        break;
    }
  }
}


// Create a new player character
let player = new Player(200, 380, 50);

// Speed variable; increases each time the player makes it across
let speedUp = 25;

// Initialize empty array to hold enemies
let allEnemies = [];

// Creating enemies
for (var i = 0; i < 3; i++) {
//speed the game more if I pass level by put more enimies
  // Set speed at which enemies will travel
  const startSpeed = speedUp * Math.floor(Math.random() * 10 + 1);

  // Push each new enemy to the array
  allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Listen for keypress to control character
document.addEventListener('keydown', function (e) {
    if(isGameOver){ return;}
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
