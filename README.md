# Classic Arcade Game Clone Project

## Features:

* Player can not move off screen
* Vehicles cross the screen
* Vehicle-player collisions happen logically (not too early or too late)
* Vehicle-player collision resets the game
* Something happens when player wins
## How to play the game: 
open index.html in your browser then you only allowed to use 4 keys left, right, up and down and try to not crash the enemies. If you pass the water then you will win and go to the next level. Until you die and the game is over.You are not allowed to go out of canvas by default.s

## Contributing: 

The game is when you dies 3 times will end. The game will contunue to run if you win to go to next level until you die then it is over.

## Steps to do it: 
* I initialize Character class with 4 properties : x,y,speed,image. and render function to draw the character on canvas
* then these properties are inheritence by Enemy and Player Objects.
* then we identify collisions wjil updating the function. and making the enemies speed normal not to slowly by using random speed.
* then we use the directions in switch using x and y.
*Identify the condition when we pass.






