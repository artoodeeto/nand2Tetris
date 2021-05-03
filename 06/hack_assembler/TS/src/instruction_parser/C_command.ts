import { Code } from "../code";
import { ICommand } from "../interfaces/command";

/**
 * parsing C instruction
 * ex:
 * D=D+1
 * AMD=D+M
 * 0;JMP
 */
export class CInstructionParser implements ICommand {
  #_dest!: string;
  #_compute!: string;
  #_jump!: string;
  #code: Code;

  constructor() {
    this.#code = new Code();
  }

  get dest(): string {
    return this.#_dest;
  }
  get comp(): string {
    return this.#_compute;
  }

  get jmp(): string {
    return this.#_jump;
  }

  parse(command: string): string {
    const cleanCommand = this.removeInlineComments(command);
    this.#_compute = "";
    this.#_dest = "";
    this.#_jump = "";
    const hasJMP = this.hasJUMPInstruction(command);
    this.CInstructionHelper(cleanCommand, cleanCommand.length - 1, "", 0, hasJMP);
    return "";
  }

  private removeInlineComments(command: string): string {
    let newStr = "";
    for (const char of command) {
      if (char === "/") break;
      newStr += char;
    }
    return newStr;
  }

  private CInstructionHelper(command: string, strLen: Number, newStr: string, counter: number, hasJMP: boolean): void {
    const str = newStr + command[counter];
    // JUMP if theres JUMP command
    // COMPUTE if theres COMPUTE no jump
    if (strLen === counter) {
      if (hasJMP) {
        this.#_jump = str;
      } else {
        this.#_compute = str;
      }

      return;
    }
    // DESTINATION
    if (command[counter] === "=") {
      this.CInstructionHelper(command, strLen, "", ++counter, hasJMP);
      this.#_dest = newStr;
      return;
    }
    // COMPUTATION
    if (command[counter] === ";") {
      this.CInstructionHelper(command, strLen, "", ++counter, hasJMP);
      this.#_compute = newStr;
      return;
    }
    this.CInstructionHelper(command, strLen, str, ++counter, hasJMP);
  }

  isValid(command: string): boolean {
    const cSyntax = new Set<string>();
    return this.isValidHelper(command, cSyntax);
  }

  private hasJUMPInstruction(command: string): boolean {
    return command.includes(";");
  }

  private isValidHelper(command: string, seenSyntax: Set<string>): boolean {
    for (const char of command) {
      if (char === "/") break; // ignore inline comments
      // dont allow these special characters in C instruction
      if (char === "@" || char === "(" || char === ")") return false;
      if (char === ";" || char === "=") {
        // allow only one ; and =
        const allowedChar = seenSyntax.has(char);
        if (allowedChar) {
          return false;
        } else {
          seenSyntax.add(char);
        }
      }
    }

    return true;
  }

  // TODO: we should also check the parsed commands if it is present in code class
  // additional validation
  private checkParsedCommandIfValid(command: string): void {}
}
