// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, the
// program clears the screen, i.e. writes "white" in every pixel.

// Put your code here.
(RESET)
@R0
M=0
@SCREEN
D=A
@scrn
M=D
@8192
D=A
@R1
M=D

// @KBD
// D=M
// @TO_PAINT_BLACK
// D;JGT

@R2
D=M
@TO_PAINT_WHITE
D;JLT

(LOOP_KBD)
 @KBD
 D=M
 @LOOP_KBD // if KBD is not pressed
 D;JEQ
 @TO_PAINT_BLACK // if KBD is pressed
 D;JGT

(TO_PAINT_WHITE)
  @R2
  M=1

  @R1
  D=M
  @RESET
  D;JEQ

  @R0
  D=M
  @scrn
  A=M
  M=D
  @scrn
  M=M+1
  @R1
  M=M-1

  @TO_PAINT_WHITE
  0;JMP

(TO_PAINT_BLACK) // SET RAM[0] to -1
  @R0
  M=-1
  @R2 // used for flag to check if we painted
  M=-1 // if -1 then we painted black FLAG to know what we will paint
  @PAINT
  0;JMP


(PAINT)

  (INNER_LOOP) // if user still pressing but we painted the whole screen
    @KBD
    D=M
    @RESET // if KBD is not pressed
    D;JEQ
  @R1
  D=M
  @INNER_LOOP
  D;JEQ

  @R0
  D=M
  @scrn
  A=M
  M=D
  @scrn
  M=M+1
  @R1
  M=M-1

  @PAINT
  0;JMP



// SCREEN SET UP
// @SCREEN
// D=A
// @scrn
// M=D

// @8193 // # of offset to add from 16384 to get the last row column of the screen
// D=A
// @counter
// M=D
// // SCREEN SET UP

// // KEYBOARD
// (LOOP_KBD)
//   @24575
//   D=M
//   @SETUP_WHITE_SCREEN
//   D;JGT

//   @KBD
//   D=M
//   @SETUP_BLACK_SCREEN
//   D;JGT
//   @LOOP_KBD
//   0;JMP

// (SETUP_WHITE_SCREEN)
//   @SCREEN
//   D=A
//   @scrn
//   M=D

//   @8193 // # of offset to add from 16384 to get the last row column of the screen
//   D=A
//   @LOOP_KBD
//   D;JEQ
//   @counter
//   M=D
//   @LOOP_SCREEN_WHITE
//   0;JMP

// // SCREEN WHITE
// (LOOP_SCREEN_WHITE)
//   @scrn
//   A=M
//   M=0

//   @scrn
//   M=M+1

//   @counter
//   D=M-1
//   @counter
//   M=D

//   @LOOP_KBD
//   D;JEQ

//   @LOOP_SCREEN_WHITE
//   0;JMP

// (SETUP_BLACK_SCREEN)
//   @SCREEN
//   D=A
//   @scrn
//   M=D

//   @8193 // # of offset to add from 16384 to get the last row column of the screen
//   D=A
//   @counter
//   M=D
//   @LOOP_SCRN_BLACK
//   0;JMP


// // SCREEN BLACK
// (LOOP_SCRN_BLACK)

//   @KBD
//   D=M
//   @SETUP_WHITE_SCREEN
//   D;JEQ

//   @scrn
//   A=M
//   M=-1

//   @scrn
//   M=M+1

//   @counter
//   D=M-1
//   @counter
//   M=D

//   @LOOP_KBD
//   D;JEQ

//   @LOOP_SCRN_BLACK
//   0;JMP