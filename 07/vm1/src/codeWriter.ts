import { CommandTypes } from "./commandTypes";

export class CodeWriter {
  nextLabel = 0;

  root: string = "foo";

  constructor() {}

  writeArithmetic(command: string) {
    let trans = "";
    if (command == "add") {
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // pop second value into M
      trans += "AM=M-1\n";
      trans += "M=D+M\n"; // push sum onto M
      trans += "@SP\n";
      trans += "M=M+1\n";
    } else if (command == "sub") {
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // pop second value into M
      trans += "AM=M-1\n";
      trans += "M=M-D\n"; // push difference onto M
      trans += "@SP\n";
      trans += "M=M+1\n";
    } else if (command == "neg") {
      trans += "@SP\n"; // get (not pop) value into M
      trans += "A=M-1\n";
      trans += "M=-M\n"; // and negate it
    } else if (command == "not") {
      trans += "@SP\n"; // get (not pop) value into M
      trans += "A=M-1\n";
      trans += "M=!M\n"; // and negate it
    } else if (command == "or") {
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // get second value into M
      trans += "A=M-1\n";
      trans += "M=D|M\n"; // put result back on stack
    } else if (command == "and") {
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // get second value into M
      trans += "A=M-1\n";
      trans += "M=D&M\n"; // put result back on stack
    } else if (command == "eq") {
      let label = this.nextLabel;
      this.nextLabel += 1;
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // get second value into M
      trans += "A=M-1\n";
      trans += "D=M-D\n"; // D = older value - newer
      trans += "M=-1\n"; // tentatively put true on stack
      trans += "@eqTrue" + label + "\n"; // and jump to end if so
      trans += "D;JEQ\n";
      trans += "@SP\n"; // set to false otherwise
      trans += "A=M-1\n";
      trans += "M=0\n";
      trans += "(eqTrue" + label + ")\n";
    } else if (command == "gt") {
      let label = this.nextLabel;
      this.nextLabel += 1;
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // get second value into M
      trans += "A=M-1\n";
      trans += "D=M-D\n"; // D = older value - newer
      trans += "M=-1\n"; // tentatively put true on stack
      trans += "@gtTrue" + label + "\n"; // and jump to end if so
      trans += "D;JGT\n";
      trans += "@SP\n"; // set to false otherwise
      trans += "A=M-1\n";
      trans += "M=0\n";
      trans += "(gtTrue" + label + ")\n";
    } else if (command == "lt") {
      let label = this.nextLabel;
      this.nextLabel += 1;
      trans += "@SP\n"; // pop first value into D
      trans += "AM=M-1\n";
      trans += "D=M\n";
      trans += "@SP\n"; // get second value into M
      trans += "A=M-1\n";
      trans += "D=M-D\n"; // D = older value - newer
      trans += "M=-1\n"; // tentatively put true on stack
      trans += "@ltTrue" + label + "\n"; // and jump to end if so
      trans += "D;JLT\n";
      trans += "@SP\n"; // set to false otherwise
      trans += "A=M-1\n";
      trans += "M=0\n";
      trans += "(ltTrue" + label + ")\n";
    }
    return trans;
  }

  writePushPop(command: CommandTypes, segment: string, index: number): string {
    let trans = "";
    if (command === CommandTypes.C_PUSH) {
      trans += "// push " + segment + index + "\n";
      if (segment == "constant") {
        trans += "@" + index + "\n"; // load index into A
        trans += "D=A\n"; // move it to D
        trans += "@SP\n"; // load 0 into A (M[0] contains stack pointer)
        trans += "A=M\n"; // load stack pointer
        trans += "M=D\n"; // put D onto stack
        trans += "@SP\n"; // load stack pointer address into A
        trans += "M=M+1\n"; // increment stack pointer
      } else if (segment === "static") {
        trans += "@" + this.root + "." + index + "\n";
        trans += "D=M\n";
        trans += "@SP\n";
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n";
        trans += "M=M+1\n";
      } else if (segment === "this") {
        trans += "@" + index + "\n"; // get value into D
        trans += "D=A\n";
        trans += "@THIS\n";
        trans += "A=M+D\n";
        trans += "D=M\n";
        trans += "@SP\n"; // put it onto the stack
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n"; // increment the stack pointer
        trans += "M=M+1\n";
      } else if (segment === "that") {
        trans += "@" + index + "\n"; // get value into D
        trans += "D=A\n";
        trans += "@THAT\n";
        trans += "A=M+D\n";
        trans += "D=M\n";
        trans += "@SP\n"; // put it onto the stack
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n"; // increment the stack pointer
        trans += "M=M+1\n";
      } else if (segment === "argument") {
        trans += "@" + index + "\n"; // get value into D
        trans += "D=A\n";
        trans += "@ARG\n";
        trans += "A=M+D\n";
        trans += "D=M\n";
        trans += "@SP\n"; // put it onto the stack
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n"; // increment the stack pointer
        trans += "M=M+1\n";
      } else if (segment === "local") {
        trans += "@" + index + "\n"; // get value into D
        trans += "D=A\n";
        trans += "@LCL\n";
        trans += "A=M+D\n";
        trans += "D=M\n";
        trans += "@SP\n"; // put it onto the stack
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n"; // increment the stack pointer
        trans += "M=M+1\n";
      } else if (segment === "temp") {
        trans += "@" + index + "\n"; // get value into D
        trans += "D=A\n";
        trans += "@5\n";
        trans += "A=A+D\n";
        trans += "D=M\n";
        trans += "@SP\n"; // put it onto the stack
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n"; // increment the stack pointer
        trans += "M=M+1\n";
      } else if (segment === "pointer") {
        trans += "@" + index + "\n"; // get value into D
        trans += "D=A\n";
        trans += "@3\n";
        trans += "A=A+D\n";
        trans += "D=M\n";
        trans += "@SP\n"; // put it onto the stack
        trans += "A=M\n";
        trans += "M=D\n";
        trans += "@SP\n"; // increment the stack pointer
        trans += "M=M+1\n";
      }
    } else if (command === CommandTypes.C_POP) {
      trans += "// pop " + segment + index + "\n";
      if (segment === "static") {
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@" + this.root + "." + index + "\n";
        trans += "M=D\n";
      } else if (segment === "this") {
        trans += "@" + index + "\n"; // get address into R13
        trans += "D=A\n";
        trans += "@THIS\n";
        trans += "D=M+D\n";
        trans += "@R13\n";
        trans += "M=D\n";
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@R13\n"; // address back in A (no touchy D)
        trans += "A=M\n";
        trans += "M=D\n";
      } else if (segment === "that") {
        trans += "@" + index + "\n"; // get address into R13
        trans += "D=A\n";
        trans += "@THAT\n";
        trans += "D=M+D\n";
        trans += "@R13\n";
        trans += "M=D\n";
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@R13\n"; // address back in A (no touchy D)
        trans += "A=M\n";
        trans += "M=D\n";
      } else if (segment === "argument") {
        trans += "@" + index + "\n"; // get address into R13
        trans += "D=A\n";
        trans += "@ARG\n";
        trans += "D=M+D\n";
        trans += "@R13\n";
        trans += "M=D\n";
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@R13\n"; // address back in A (no touchy D)
        trans += "A=M\n";
        trans += "M=D\n";
      } else if (segment === "local") {
        trans += "@" + index + "\n"; // get address into R13
        trans += "D=A\n";
        trans += "@LCL\n";
        trans += "D=M+D\n";
        trans += "@R13\n";
        trans += "M=D\n";
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@R13\n"; // address back in A (no touchy D)
        trans += "A=M\n";
        trans += "M=D\n";
      } else if (segment === "pointer") {
        trans += "@" + index + "\n"; // get address into R13
        trans += "D=A\n";
        trans += "@3\n";
        trans += "D=A+D\n";
        trans += "@R13\n";
        trans += "M=D\n";
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@R13\n"; // address back in A (no touchy D)
        trans += "A=M\n";
        trans += "M=D\n";
      } else if (segment === "temp") {
        trans += "@" + index + "\n"; // get address into R13
        trans += "D=A\n";
        trans += "@5\n";
        trans += "D=A+D\n";
        trans += "@R13\n";
        trans += "M=D\n";
        trans += "@SP\n"; // pop value into D
        trans += "AM=M-1\n";
        trans += "D=M\n";
        trans += "@R13\n"; // address back in A (no touchy D)
        trans += "A=M\n";
        trans += "M=D\n";
      }
    }
    return trans;
  }
}
