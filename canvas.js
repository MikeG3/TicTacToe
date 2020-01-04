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
var squareSize = 50;
var aSquareR = 0;
var aSquareG = 0;
var aSquareB = 0;
var aSquareA = 0.5;
var bSquareR = 0;
var bSquareG = 0;
var bSquareB = 0;
var incrementing = true;

//strat drawing


c.fillStyle = "#FF00EE";

//CHECKERED BOARD
// for (i = 0 ; i < windowHeight ; i+=squareSize ){
//   for (j = 0 ; j < windowWidth ; j+=(2*squareSize) ) {  //j = (2*squareSize)
//     if ( (j==0) && (i/40%2 != 0) ){     //if first in the row, and is an odd row number, offset by 1 square
//       j += squareSize;
//     }//close if
//     c.fillRect(j, i, 40, 40);  
//     document.write("i = " +i + "   ");
//     document.write("j= " + j + "<br>");
//   }//close inner for loop
//   //update colors
// }//close outter for loop
// document.write("Window width = " + windowWidth + "<br>");
// document.write("Window height = " + windowHeight + "<br>");

function animate() {
  
  //variables 

  
  //UPDATE SQUARE SIZE
  if (squareSize < 5) {
    incrementing = true;
  }
    if (squareSize > 100 || squareSize > (windowHeight/2) || squareSize > (windowWidth/2)) {
    incrementing = false;
  }
  if (incrementing){
    squareSize++;
  }
    else {
      squareSize--;
    }
  
  //CHECKERED BOARD
for (i = 0 ; i < windowHeight ; i+=squareSize ){
  for (j = 0 ; j < windowWidth ; j+=(2*squareSize) ) {  //j = (2*squareSize)
    if ( (j==0) && (i/squareSize%2 != 0) ){     //if first in the row, and is an odd row number, offset by 1 square
      j += squareSize;
    }//close if
    //update colors
    aSquareR += 5;
    aSquareR %= 255;
    aSquareG += 25;
    aSquareG %= 255;
    aSquareB += 15;
    aSquareB %= 255;
    c.fillStyle = 'rgba(' + aSquareR + ',' + aSquareG + ',' + aSquareB + ','+ aSquareA + ')';
    c.fillRect(j, i, squareSize, squareSize);  
  }//close inner for loop
  
  //update colors
  aSquareR += 5;
  aSquareR %= 255;
  aSquareG += 25;
  aSquareG %= 255;
  aSquareB += 15;
  aSquareB %= 255;
  c.fillStyle = 'rgba(' + aSquareR + ',' + aSquareG + ',' + aSquareB + ','+ aSquareA + ')';
  
}//close outter for loop
// document.write("Window width = " + windowWidth + "<br>");
// document.write("Window height = " + windowHeight + "<br>");
  
frameCounter++;
requestAnimationFrame(animate);
//output to console
console.log(canvas);
};

animate();
