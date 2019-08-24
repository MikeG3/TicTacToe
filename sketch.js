/*
SOUND PAD
4 OCTAVES X 7 NOTES PER SCALE = 28 ROWS
32 COLUMNS FOR 32ND NOTES

ADD:
SCALE CHANGER -> THAT CHANGES THE FREQUENCIES TO A DIFFERENT SCALE
NOTE CHANGER -> CHANGES FREQUENCIES BASED ON DIFFERENT ROOT NOTE
SOUND FX
TEMPO CHANGER
*/

//SET SKETCH HEIGHT AND WIDTH
var pWidth = window.innerWidth - 15;
var pHeight = window.innerHeight - 15;

//GLOBAL VARIABLES
var frameCounter = 0;
var i = 0;
var j = 0;
var k = 0;
var xPos = 0;
var yPos = 0;
var gridSizeX = 32;
var gridSizeY = 28;
var squareSize = 15;
var aSquareR = 0;
var aSquareG = 0;
var aSquareB = 0;
var aSquareA = 0.5;
var bSquareR = 0;
var bSquareG = 0;
var bSquareB = 0;
var bSquareA = 0.5;
var grayColor = 0;
var incrementing = true;
var soundWaves;
var selectedSquares = [gridSizeY];
var hole, half, quarter, eigth;
var tempo = 50;           //integer value used for counter to start/stop oscillator
var noteDuration = 1.5;
var delay = 0;
var startNote = 36;      //A4
var note = startNote;

//7 octaves    KEY = NOTE+(12*(OCTAVE-1))  //A:0 A#:1  B:2 C:3 C#:4  D:5 D#:6 E:7 F:8 F#:9 G:10  G#11        INDEX = NOTE+(12*(OCTAVE-1))
   //A1 - G#1     //A7 - G#7
var notes = [                     
  55, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83,                         
  110, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 
  220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3,
  440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61,
  880, 932.33, 987.77, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22,
  1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 
  3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88,   
  7040, 7458.62, 7902.13 ];
  
var majorScales = [7];     //7 OCTAVES
note = 0;
//FOR EACH OCTAVE
for ( i = 0 ; i < 7 ; i++){
  //FOR EACH NOTE OF THE OCTAVE/SCALE
   for ( j = 0 ; j < 12 ; j++){
      //ROOT NOTE IS 0
      majorScales.push(notes[(j+(i*7))]);
      //j INCREMENTS BY 1 TWICE, ALL OTHER TIMES BY 2
      if (j != 3 && j != 7) {
         j++
      }//close if not the 4th, nor 8th note
   }//close for j each note in the scale
}//close for i each octave
note = 0;

/*
REPLACE BELOW WITH FOR LOOP, 
*/
/*
var majorScale = [ notes[note], notes[note+=2],  notes[note+=2],  notes[note+=1],  notes[note+=2],  notes[note+=2],  notes[note+=2],  notes[note+=1],
                 notes[note+=2],  notes[note+=2],  notes[note+=1],  notes[note+=2],  notes[note+=2],  notes[note+=2],  notes[note+=1],
                 notes[note+=2],  notes[note+=2],  notes[note+=1],  notes[note+=2],  notes[note+=2],  notes[note+=2],  notes[note+=1] ];
*/
note = 0;
var minorScale = [  note,  note+=2,  note+=1,  note+=2,  note+=2,  note+=1,  note+=2,  note+=2,
                  note+=2,  note+=1,  note+=2,  note+=2,  note+=1,  note+=2,  note+=2,
                  note+=2,  note+=1,  note+=2,  note+=2,  note+=1,  note+=2,  note+=2 ];

//RESPOND TO ARROW KEY INPUT (ASCII 37-40)
window.addEventListener('keydown', move );

//FUNCTIONS
function move(key) {
    //MOVE SELECTED SQUARE IN GRID WITH ARROW KEYS
    if (key.keyCode == 37) {xPos -= 1; if (xPos < 0) { xPos += gridSizeX; } }
    if (key.keyCode == 39) {xPos +=1; if (xPos == gridSizeX) { xPos = 0; } }
    if (key.keyCode == 38) {yPos -= 1; if (yPos < 0) { yPos += gridSizeY; } }
    if (key.keyCode == 40) {yPos += 1; if (yPos == gridSizeY) { yPos = 0;} }
    //TOGGLE SELECTED SQUARE
    if (key.keyCode == 13) { selectedSquares[yPos][xPos] = !selectedSquares[yPos][xPos];  }
}//close move function

function setup() {
    createCanvas(pWidth, pHeight);
    background( 95, 95, 95);
    frameRate(60);
    //CREATE AND SETUP POLYSYNTH
    soundWaves = new p5.PolySynth();
   //INITIALIZE ALL SQUARES TO FLASE, NOT SELECTED
    for (i = 0 ; i < gridSizeY ; i++) {
        //INITIALIZE ALL SQUARES TO FLASE, NOT SELECTED
        selectedSquares[i] = new Array(); 
        for (j = 0 ; j < gridSizeX ; j++) {
             selectedSquares[i].push(false);
         }//close for j
    }//close for i
    //CONSTRUCT ENVELOPES FOR TONE DURATION
    hole = new p5.Env();
    hole.setADSR(0.5, 0.5, 0.5, 0.5)
    hole.setRange(1, 0);
    //TEST SOUND
    for ( i = 0 ; i < minorScale.length ; i++ ) {
        soundWaves.play( minorScale[i], 0.1, delay, noteDuration);
        delay+=noteDuration;
    }//close for each note in minor scale
  /*
        for ( i = 0 ; i < majorScale.length ; i++ ) {
        soundWaves.play( majorScale[i], 0.1, delay, noteDuration);
        delay+=noteDuration;
    }//close for each note in minor scale
    */
    /*
    soundWaves.play("G1", 0.1, 0, 3);
    soundWaves.play("G2", 0.1, 0, 6);
    soundWaves.play("G3", 0.1, 0, 9);
    soundWaves.play("G4", 0.1, 0, 12);
    soundWaves.play("G5", 0.1, 0, 15);
    soundWaves.play("G6", 0.1, 0, 18);
    //A MAJOR SCALE
    soundWaves.play("A2", 0.1, delay, 1.5);
    soundWaves.play("B2", 0.1, delay += 1.5, 1.5);
    soundWaves.play("C#2", 0.1, delay += 1.5, 1.5);
    soundWaves.play("D2", 0.1, delay += 1.5, 1.5);
    soundWaves.play("E2", 0.1, delay += 1.5, 1.5);
    soundWaves.play("F#2", 0.1, delay += 1.5, 1.5);
    soundWaves.play("G#2", 0.1, delay += 1.5, 1.5);
    soundWaves.play("A3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("B3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("C#3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("D3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("E3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("F#3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("G#3", 0.1, delay += 1.5, 1.5);
    soundWaves.play("A4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("B4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("C#4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("D4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("E4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("F#4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("G#4", 0.1, delay += 1.5, 1.5);
    soundWaves.play("A5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("B5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("C#5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("D5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("E5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("F#5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("G#5", 0.1, delay += 1.5, 1.5);
    soundWaves.play("A6", 0.1, delay += 1.5, 1.5);
    */
}//close setup

//DRAW LOOPS FOREVER
function draw() {
   
    //CHECKERED BOARD
    for (i = 0 ; i < gridSizeY ; i++ ){
      for (j = 0 ; j < gridSizeX  ; j++) { 
          
        //UPDATE COLORS
        aSquareR += 5;
        aSquareR %= 255;
        aSquareG += 25;
        aSquareG %= 255;
        aSquareB += 15;
        aSquareB %= 255;
        bSquareR += 3;
        bSquareR %= 255;
        bSquareG += 2;
        bSquareG %= 255;
        bSquareB += 6;
        bSquareB %= 255;

        //UPDATE FILLSTYLE AFTER COLOR IS SELECTED
        if ( (i%2 == 0 && j%2 ==0) || (i%2 == 1 && j%2 == 1)  ) {
            fill(200, 100, 120);
        }//close if
        else {
            fill(23, 14, 198);
        }

        //COLOR SELECTED SQUARES 
        if ( selectedSquares[i][j] ){
            fill(25, 255, 75);
            //PLAY SOUNDS
            soundWaves.play("G#2", 0.1, 0, 2);
            soundWaves.play("G#3", 0.1, 0, 4);
            soundWaves.play("G#4", 0.1, 0, 6);
            soundWaves.play("G#5", 0.1, 0, 8);
        }//close if selected position squares
        //COLOR SELECTED SQUARE
        if ( j == xPos && i == yPos ){
            fill(25, 25, 25);
        }//close if selected position square
        if ( j == xPos && i == yPos && selectedSquares[i][j]){
            fill(122, 20, 50);
        }//close if selected position square
        //DRAW EACH RECTANGLE IN THE LOOPS
         rect(j*squareSize , i*squareSize , squareSize, squareSize); 
          
        }//close inner for loop
        
    }//close outter for loop

    //PLAY SOUND
    /*
     for (i = 0 ; i < gridSizeX ; i++ ){
      for (j = 0 ; j < gridSizeY  ; j++) { 
          if ( selectedSquares[j][i] ){
            soundWaves.play("G1", 0.1, 0, noteDuration);
            soundWaves.play("G2", 0.1, 1, noteDuration);
            soundWaves.play("G3", 0.1, 2, noteDuration);
            soundWaves.play("G4", 0.1, 3, noteDuration);
        }//close if selected position square
      }//close for j each note pitch vertically
     }//close for i note duration horizontaly 
     */
    
    //UPDATE FRAME COUNT
    frameCounter++;
}//close draw
