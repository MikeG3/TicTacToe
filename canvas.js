// canvas can now be called by this variable
var canvas = document.querySelector('canvas');

//set canvas height and width
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 1.25;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
//RESPOND TO ARROW KEY INPUT (ASCII 37-40 for arrows)
window.addEventListener('keydown', move);
canvas.addEventListener('keydown', move);

//Gives canvas API 2d drawing functions
var c = canvas.getContext('2d');

//variables
var frameCounter = 0;
var turn = 0;
var gameOver = false;
var cpuWin = false;
var playerWin = false;
var playerTurn = false;
var select = false;
var i = 0;
var j = 0;
var k = 0;
var x = windowWidth / 5;
var y = x;
var x1 = x;
var x2 = x * 2;
var x3 = x * 3;
var y1 = 1;
var y2 = x;
var y3 = x * 2;
var grid = [-1, -1, -1, -1, -1, -1, -1, -1, -1]; //0 is x    1 = y
var xPos = 0;
var yPos = 0;

c.fillStyle = "#FF00EE";

//FUNCTION DEFINITIONS
function move(key) {
  //RESTART GAME
  if (key.keyCode == 81 || key.keyCode == 27) {
    restart();
  }
  //MOVE
  if (key.keyCode == 37) {
    xPos = (xPos - 1);
    if (xPos < 0) {
      xPos = 2;
    }
  }
  if (key.keyCode == 39) {
    xPos = (xPos + 1);
    if (xPos > 2) {
      xPos = 0;
    }
  }
  if (key.keyCode == 38) {
    yPos = (yPos - 1);
    if (yPos < 0) {
      yPos = 2;
    }
  }
  if (key.keyCode == 40) {
    yPos = (yPos + 1);
    if (yPos > 2) {
      yPos = 0;
    }
  }
  //TOGGLE SELECTED SQUARE
  if (key.keyCode == 13) {
    //  if (playerTurn){
    placeY();
    playerTurn = false;
    cpuTurn = true;
    //}//close  if its the players turn
  } //close if keycode selected
  drawGrid();
} //close move function

function restart() {
  gameOver = false;
  turn = 0;
  cpuWin = false;
  playerWin = false;
  playerTurn = false;
  for (i = 0; i < grid.length; i++) {
    grid[i] = -1;
  } //close for i
  drawGrid();
} //close function restart

function drawGrid() {
  //GRID     //0 is x    1 = y
  c.rect(x, x, x * 3, 1);
  c.rect(x, x * 2, x * 3, 1);
  c.rect(x * 2, 0, 1, x * 3);
  c.rect(x * 3, 0, 1, x * 3);
  c.fillStyle = "#307ad9";
  //FILL SQUARES
  c.fillRect(x1, y1, x, y);
  c.fillRect(x2, y1, x, y);
  c.fillRect(x3, y1, x, y);
  c.fillRect(x1, y2, x, y);
  c.fillRect(x2, y2, x, y);
  c.fillRect(x3, y2, x, y);
  c.fillRect(x1, y3, x, y);
  c.fillRect(x2, y3, x, y);
  c.fillRect(x3, y3, x, y);
  //SELECTED SQUARE
  c.fillStyle = "#504ed1";
  if (xPos == 0 && yPos == 0) {
    c.fillRect(x1, y1, x, y);
  } else if (xPos == 1 && yPos == 0) {
    c.fillRect(x2, y1, x, y);
  } else if (xPos == 2 && yPos == 0) {
    c.fillRect(x3, y1, x, y);
  } else if (xPos == 0 && yPos == 1) {
    c.fillRect(x1, y2, x, y);
  } else if (xPos == 1 && yPos == 1) {
    c.fillRect(x2, y2, x, y);
  } else if (xPos == 2 && yPos == 1) {
    c.fillRect(x3, y2, x, y);
  } else if (xPos == 0 && yPos == 2) {
    c.fillRect(x1, y3, x, y);
  } else if (xPos == 1 && yPos == 2) {
    c.fillRect(x2, y3, x, y);
  } else if (xPos == 2 && yPos == 2) {
    c.fillRect(x3, y3, x, y);
  }
  //DRAW X AND Y
  c.font = "50px Arial";
  c.fillStyle = "#000000";
  if (grid[0] == 0) {
    c.fillText("X", x1 + x / 2.5, y1 + x / 1.5);
  } //close if
  else if (grid[0] == 1) {
    c.fillText("Y", x1 + x / 2.5, y1 + x / 1.5);
  } //close if
  if (grid[1] == 0) {
    c.fillText("X", x2 + x / 2.5, y1 + x / 1.5);
  } //close if
  else if (grid[1] == 1) {
    c.fillText("Y", x2 + x / 2.5, y1 + x / 1.5);
  } //close if
  if (grid[2] == 0) {
    c.fillText("X", x3 + x / 2.5, y1 + x / 1.5);
  } //close if
  else if (grid[2] == 1) {
    c.fillText("Y", x3 + x / 2.5, y1 + x / 1.5);
  } //close if
  if (grid[3] == 0) {
    c.fillText("X", x1 + x / 2.5, y2 + x / 1.5);
  } //close if
  else if (grid[3] == 1) {
    c.fillText("Y", x1 + x / 2.5, y2 + x / 1.5);
  } //close if
  if (grid[4] == 0) {
    c.fillText("X", x2 + x / 2.5, y2 + x / 1.5);
  } //close if
  else if (grid[4] == 1) {
    c.fillText("Y", x2 + x / 2.5, y2 + x / 1.5);
  } //close if
  if (grid[5] == 0) {
    c.fillText("X", x3 + x / 2.5, y2 + x / 1.5);
  } //close if
  else if (grid[5] == 1) {
    c.fillText("Y", x3 + x / 2.5, y2 + x / 1.5);
  } //close if
  if (grid[6] == 0) {
    c.fillText("X", x1 + x / 2.5, y3 + x / 1.5);
  } //close if
  else if (grid[6] == 1) {
    c.fillText("Y", x1 + x / 2.5, y3 + x / 1.5);
  } //close if
  if (grid[7] == 0) {
    c.fillText("X", x2 + x / 2.5, y3 + x / 1.5);
  } //close if
  else if (grid[7] == 1) {
    c.fillText("Y", x2 + x / 2.5, y3 + x / 1.5);
  } //close if
  if (grid[8] == 0) {
    c.fillText("X", x3 + x / 2.5, y3 + x / 1.5);
  } //close if
  else if (grid[8] == 1) {
    c.fillText("Y", x3 + x / 2.5, y3 + x / 1.5);
  } //close if

  c.stroke();
} //close function draw grid

function placeY() {
  var gridValue = xPos + (yPos * 3);
  if (grid[gridValue] == -1) {
    grid[gridValue] = 1;
    playerTurn = false;
    cpuTurn = true;
  } //close if
} //close function selectSquare

function playersTurn() {
  while (playerTurn) {
    k = 0;
    while (k < 100) {
      k++;
    }
    break;
    drawGrid();
  } //close while player turn
  cpuTurn = true;
  playerTurn = false;
} //close function player turn

function cpuTurn() {
  //EASY MODE
  for (i = 0; i < grid.length; i++) {
    if (grid[i] == -1) {
      grid[i] = 0;
      break;
    } //close if available square
  } //close for i
  playerTurn = true;
  cpuTurn = false;
} //close function player turn

//UPDATE WINNER
function checkWinner() {
  if ((grid[0] == 0 && grid[1] == 0 && grid[2] == 0) ||
    (grid[3] == 0 && grid[4] == 0 && grid[5] == 0) ||
    (grid[6] == 0 && grid[7] == 0 && grid[8] == 0) ||
    (grid[0] == 0 && grid[3] == 0 && grid[6] == 0) ||
    (grid[1] == 0 && grid[4] == 0 && grid[7] == 0) ||
    (grid[2] == 0 && grid[5] == 0 && grid[8] == 0) ||
    (grid[0] == 0 && grid[4] == 0 && grid[8] == 0) ||
    (grid[6] == 0 && grid[4] == 0 && grid[2] == 0)) {
    alert("CPU WINS!!");
    cpuWin = true;
    gameOver = true;
  } //close if cpu wins

  //UPDATE WINNER
  if ((grid[0] == 1 && grid[1] == 1 && grid[2] == 1) ||
    (grid[3] == 1 && grid[4] == 1 && grid[5] == 1) ||
    (grid[6] == 1 && grid[7] == 1 && grid[8] == 1) ||
    (grid[0] == 1 && grid[3] == 1 && grid[6] == 1) ||
    (grid[1] == 1 && grid[4] == 1 && grid[7] == 1) ||
    (grid[2] == 1 && grid[5] == 1 && grid[8] == 1) ||
    (grid[0] == 1 && grid[4] == 1 && grid[8] == 1) ||
    (grid[6] == 1 && grid[4] == 1 && grid[2] == 1)) {
    //document.write("YOU WIN!!");
    alert("YOU WIN!!!")
    playerWin = true;
    gameOver = true;
  } //close if cpu wins

} //close function check winner
function animate() {
  drawGrid();
  alert("The game has begun");
  alert("The grid length is " + grid.length );
  //GAME LOOP
  while (!gameOver) {
  alert("Turn number " + turn);
    //TURNS
    drawGrid();
    turn++;
    cpuTurn();
    cpuTurn = true;
    playerTurn = false;
    // turn++;
    // checkWinner();
    // if (!gameOver && turn < 10 ){
    //   //playersTurn();
    //   checkWinner();
    // }//close uf game not over
    //
    //DRAW GRID
    drawGrid();

    //UPDATE GAME OVER
    if (turn == 10) {
      gameOver = true;
      alert("The game is over");
      document.write("THE GAME IS OVER, PRESS ESC OR Q TO START AGAIN");
    } //close if there are no turns left

  } //close while game is not over

  drawGrid();

  //animate
  frameCounter++;
  requestAnimationFrame(animate);
  //output to console
  console.log(canvas);
  //animate();
} //close function play tic tac toe

//CODE TO BE EXECUTED
animate();
