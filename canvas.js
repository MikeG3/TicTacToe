//canvas can now be called by this variable
var canvas = document.querySelector('canvas');

//set canvas height and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//Gives canvas API 2d drawing functions
var c = canvas.getContext('2d');

//variables
var frameCounter = 0;
var i = 0;
var j = 0;
var k = 0;
var grid = [ -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
var playerTurn = false;

c.fillStyle = "#FF00EE";



function playTicTacToe() {
  
  //variables 

  //GAME LOOP
  
  //DRAW GRID
  
  //PLACE NUMBERS
  
// document.write("Window width = " + windowWidth + "<br>");
// document.write("Window height = " + windowHeight + "<br>");
  
frameCounter++;
requestAnimationFrame(animate);
//output to console
console.log(canvas);
};//close function play tic tac toe

playTicTacToe();
