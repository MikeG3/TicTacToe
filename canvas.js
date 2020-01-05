// canvas can now be called by this variable
var canvas = document.querySelector('canvas');

//set canvas height and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
//RESPOND TO ARROW KEY INPUT (ASCII 37-40 for arrows)
//window.addEventListener('keydown', move );
canvas.addEventListener('keydown', move );

//Gives canvas API 2d drawing functions
var c = canvas.getContext('2d');

//variables
var frameCounter = 0;
var i = 0;
var j = 0;
var k = 0;
var x = windowWidth;
var y = windowHeight;
var x1 = x*3/16;
var x2 = x*5.5/12;
var x3 = x*12/16;
var y1 = y*2.2/8;
var y2 = y*8/16;
var y3 = y*11.5/16;
var grid = [ -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
var playerTurn = false;
var xPos = 0;
var yPos = 0;

c.fillStyle = "#FF00EE";

function move(key) {
    if (key.keyCode == 37) {xPos = (xPos-1); if (xPos < 0) { xPos = 2; } }
    if (key.keyCode == 39) {xPos = (xPos+1); if (xPos > 2) { xPos = 0; } }
    if (key.keyCode == 38) {yPos = (yPos-1); if (yPos < 0) { yPos = 2; } }
    if (key.keyCode == 40) {yPos = (yPos+1); if (yPos == gridSizeY) { yPos = 0; } }
    //TOGGLE SELECTED SQUARE
    if (key.keyCode == 13) { selectedSquares[yPos][xPos] = !selectedSquares[yPos][xPos]; }
}//close move function

function drawGrid(){
  //GRID
  c.rect( x/8, y*3/8, x*3/4, 1 );
  c.rect( x/8, y*9/16, x*3/4, 1 );
  c.rect( y/3, y/8, 1, x*3/4 );
  c.rect( x*5/8, y/8, 1, x*3/4);
  //SELECTED SQUARE
  c.fillStyle = "#504ed1";
  if (xPos == 0 && yPos == 0){ c.fillRect(x*2/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 1 && yPos == 0){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 2 && yPos == 0){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 0 && yPos == 1){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 1 && yPos == 1){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 2 && yPos == 1){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 0 && yPos == 2){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 1 && yPos == 2){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}
  else if (xPos == 2 && yPos == 2){ c.fillRect(x*4/16, y/8, x*3/12, y*2/8);}

  c.font = "30px Arial";
  //c.fillText(grid[0], x1, y1);
  if (grid[0] == 0){  c.fillText("X", x1, y1); }//close if
  else if (grid[0] == 1){ c.fillText("Y", x1, y1); }//close if
  //c.fillText(grid[1], x2, y1);
  if (grid[1] == 0){ c.fillText("X", x2, y1); }//close if
  else if (grid[1] == 1){
    c.fillText("Y", x2, y1);
  }//close if
  //c.fillText(grid[2], x3, y1);
  if (grid[2] == 0){
    c.fillText("X", x3, y1);
  }//close if
  else if (grid[2] == 1){
    c.fillText("Y", x3, y1);
  }//close if
  //c.fillText(grid[3], x1, y2);
  if (grid[3] == 0){
    c.fillText("X", x1, y2);
  }//close if
  else if (grid[3] == 1){
    c.fillText("Y", x1, y2);
  }//close if
  //c.fillText(grid[4], x2, y2);
  if (grid[4] == 0){
    c.fillText("X", x2, y2);
  }//close if
  else if (grid[4] == 1){
    c.fillText("Y", x2, y2);
  }//close if
  //c.fillText(grid[5], x3, y2);
  if (grid[5] == 0){
    c.fillText("X", x3, y2);
  }//close if
  else if (grid[5] == 1){
    c.fillText("Y", x3, y2);
  }//close if
  //c.fillText(grid[6], x1, y3);
  if (grid[6] == 0){
    c.fillText("X", x1, y3);
  }//close if
  else if (grid[6] == 1){
    c.fillText("Y", x1, y3);
  }//close if
  //c.fillText(grid[7], x2, y3);
  if (grid[7] == 0){
    c.fillText("X", x2, y3);
  }//close if
  else if (grid[7] == 1){
    c.fillText("Y", x2, y3);
  }//close if
  //c.fillText(grid[8], x3, y3);
  if (grid[8] == 0){
    c.fillText("X", x3, y3);
  }//close if
  else if (grid[8] == 1){
    c.fillText("Y", x3, y3);
  }//close if



  c.stroke();
}//close function draw grid

function playTicTacToe() {

  //variables

  //GAME LOOP

  //DRAW GRID
  drawGrid();

  document.write("HELLO WORLD");

//document.write("Window width = " + windowWidth + "<br>");
//document.write("Window height = " + windowHeight + "<br>");

frameCounter++;
requestAnimationFrame(animate);
//output to console
console.log(canvas);
}//close function play tic tac toe

playTicTacToe();
