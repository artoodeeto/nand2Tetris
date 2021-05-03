// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.

@R2
M=0

@R0
D=M
@END
D;JLE

@R1
D=M
@END
D;JLE

(LOOP)

  // Adds R0 to result variable
  @R0
  D=M
  @result
  D=D+M
  @result
  M=D

  @R1
  D=M-1
  @R1
  M=D

  @RET
  D;JEQ // Afeter subtraction we check jump if DATA is 0

  @LOOP
  0;JMP

(RET)
  @result // SET result to DATA
  D=M
  @R2
  M=D
  @END

(END)
  @result
  M=0 // set result back to 0

  @END
  0;JMP





// WEAK IMPLEMENTATION

  
// @R0
// D=M
// @reg0
// M=D

// @R1
// D=M
// @reg1
// M=D

// @counter
// M=0

// (LOOP)
  // set counter++
  // @counter
  // D=M+1
  // @counter
  // M=D
  
  // @reg1
  // D=M-D // counter - input 1 OR RAM[1]

//   @R1
//   D=M-1
//   @R1
//   M=D

//   @RET
//   D;JLT // Afeter subtraction we check jump if DATA is 0

//   // Adds R0 to reg0 variable
//   @R0
//   D=M
//   @reg0
//   D=D+M
//   @reg0
//   M=D

//   @LOOP
//   0;JMP

// (RET)
//   @reg0 // SET reg0 to DATA
//   D=M
//   @END

// (END)
//   @END
//   0;JMP