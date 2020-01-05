// canvas can now be called by this variable
var canvas = document.querySelector('canvas');

//set canvas height and width
canvas.width = window.innerWidth*0.95;
canvas.height = window.innerHeight*1.25;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
//RESPOND TO ARROW KEY INPUT (ASCII 37-40 for arrows)
window.addEventListener('keydown', move );
canvas.addEventListener('keydown', move );

//Gives canvas API 2d drawing functions
var c = canvas.getContext('2d');

//variables
var frameCounter = 0;
var i = 0;
var j = 0;
var k = 0;
var x = windowWidth/5;
var y = x;
var x1 = x;
var x2 = x*2;
var x3 = x*3;
var y1 = 1;
var y2 = x;
var y3 = x*2;
var grid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ];
var playerTurn = false;
var xPos = 0;
var yPos = 0;

c.fillStyle = "#FF00EE";

function move(key) {
    if (key.keyCode == 37) {xPos = (xPos-1); if (xPos < 0) { xPos = 2; } }
    if (key.keyCode == 39) {xPos = (xPos+1); if (xPos > 2) { xPos = 0; } }
    if (key.keyCode == 38) {yPos = (yPos-1); if (yPos < 0) { yPos = 2; } }
    if (key.keyCode == 40) {yPos = (yPos+1); if (yPos > 2) { yPos = 0; } }
    //TOGGLE SELECTED SQUARE
    if (key.keyCode == 13) { selectedSquares[yPos][xPos] = !selectedSquares[yPos][xPos]; }
}//close move function

function drawGrid(){
  //
  //DEBUG
  //
  // c.font = "50px Arial";
  // c.fillStyle = "#000000";
  // c.fillText(frameCounter, x/2, x/2);

  //GRID
  c.rect( x, x, x*3, 1 );
  c.rect( x, x*2, x*3, 1 );
  c.rect( x*2, 0, 1, x*3 );
  c.rect( x*3, 0, 1, x*3);
  //SELECTED SQUARE
  c.fillStyle = "#307ad9";
  c.fillRect(x1, y1, x, y);
  c.fillRect(x2, y1, x, y);
  c.fillRect(x3, y1, x, y);
  c.fillRect(x1, y2, x, y);
  c.fillRect(x2, y2, x, y);
  c.fillRect(x3, y2, x, y);
  c.fillRect(x1, y3, x, y);
  c.fillRect(x2, y3, x, y);
  c.fillRect(x3, y3, x, y);
  c.fillStyle = "#504ed1";
  if (xPos == 0 && yPos == 0){ c.fillRect(x1, y1, x, y);}
  else if (xPos == 1 && yPos == 0){ c.fillRect(x2, y1, x, y);}
  else if (xPos == 2 && yPos == 0){ c.fillRect(x3, y1, x, y);}
  else if (xPos == 0 && yPos == 1){ c.fillRect(x1, y2, x, y);}
  else if (xPos == 1 && yPos == 1){ c.fillRect(x2, y2, x, y);}
  else if (xPos == 2 && yPos == 1){ c.fillRect(x3, y2, x, y);}
  else if (xPos == 0 && yPos == 2){ c.fillRect(x1, y3, x, y);}
  else if (xPos == 1 && yPos == 2){ c.fillRect(x2, y3, x, y);}
  else if (xPos == 2 && yPos == 2){ c.fillRect(x3, y3, x, y);}

  c.font = "50px Arial";
  c.fillStyle = "#000000";
  //c.fillText(grid[0], x1, y1);
  if (grid[0] == 0){  c.fillText("X", x1+x/2.5, y1+x/1.5); }//close if
  else if (grid[0] == 1){ c.fillText("Y", x1+x/2.5, y1+x/1.5); }//close if
  //c.fillText(grid[1], x2, y1);
  if (grid[1] == 0){ c.fillText("X", x2+x/2.5, y1+x/1.5); }//close if
  else if (grid[1] == 1){ c.fillText("Y", x2+x/2.5, y1+x/1.5); }//close if
  //c.fillText(grid[2], x3, y1);
  if (grid[2] == 0){ c.fillText("X", x3+x/2.5, y1+x/1.5); }//close if
  else if (grid[2] == 1){ c.fillText("Y", x3+x/2.5, y1+x/1.5); }//close if
  //c.fillText(grid[3], x1, y2);
  if (grid[3] == 0){ c.fillText("X", x1+x/2.5, y2+x/1.5); }//close if
  else if (grid[3] == 1){ c.fillText("Y", x1+x/2.5, y2+x/1.5); }//close if
  //c.fillText(grid[4], x2, y2);
  if (grid[4] == 0){ c.fillText("X", x2+x/2.5, y2+x/1.5); }//close if
  else if (grid[4] == 1){ c.fillText("Y", x2+x/2.5, y2+x/1.5); }//close if
  //c.fillText(grid[5], x3, y2);
  if (grid[5] == 0){ c.fillText("X", x3+x/2.5, y2+x/1.5); }//close if
  else if (grid[5] == 1){ c.fillText("Y", x3+x/2.5, y2+x/1.5); }//close if
  //c.fillText(grid[6], x1, y3);
  if (grid[6] == 0){ c.fillText("X", x1+x/2.5, y3+x/1.5); }//close if
  else if (grid[6] == 1){ c.fillText("Y", x1+x/2.5, y3+x/1.5); }//close if
  //c.fillText(grid[7], x2, y3);
  if (grid[7] == 0){ c.fillText("X", x2+x/2.5, y3+x/1.5); }//close if
  else if (grid[7] == 1){ c.fillText("Y", x2+x/2.5, y3+x/1.5); }//close if
  //c.fillText(grid[8], x3, y3);
  if (grid[8] == 0){ c.fillText("X", x3+x/2.5, y3+x/1.5); }//close if
  else if (grid[8] == 1){ c.fillText("Y", x3+x/2.5, y3+x/1.5); }//close if
  c.stroke();
}//close function draw grid

function animate() {

  //variables

  //GAME LOOP

  //DRAW GRID
  drawGrid();

//document.write("HELLO WORLD");
//document.write("Window width = " + windowWidth + "<br>");
//document.write("Window height = " + windowHeight + "<br>");

frameCounter++;
requestAnimationFrame(animate);
//output to console
console.log(canvas);
//animate();
}//close function play tic tac toe

animate();
