import { ICommand } from "../interfaces/command";

/**
 * parsing A instruction
 * @R0 register
 * @12 immediate value
 * @abc123 variable
 *
 */
export class AInstructionParser implements ICommand {
  /**
   *
   * @param command for A instruction
   * @returns a number if A instruction is imediate value else string
   */
  parse(command: string): string | number {
    const chars = this.takeRestOfChars(command);
    const [isImmediate, valIm] = this.immediateValueParser(chars);
    const [isRegister, valReg] = this.registerParser(chars);
    if (isImmediate) return valIm;
    if (isRegister) return valReg;
    // if its not an immediate or register it must be a variable
    // we return chars
    return chars;
  }

  /**
   * if this is an immediate value then all chars after @ should be number
   * we have to check every character if its a real immediate value
   * @param command
   * @returns [boolean, number], a tuple of boolean type at index 0 and a number type at index 1
   */
  private immediateValueParser(command: string): [boolean, number] {
    let appendInt = "";
    // all should be integer
    for (const char of command) {
      if (char === "/") break; // ignore inline comments
      if (Number.isNaN(Number(char))) return [false, 0];
      appendInt += char;
    }

    return [true, Number(appendInt)];
  }

  private registerParser(command: string): [boolean, string] {
    const [R, ...rest] = command.split("");
    let appendChars = "";
    if (R !== "R") return [false, command];
    for (const char of rest) {
      if (char === "/") break;
      if (Number.isNaN(Number(char))) return [false, command];
      appendChars += char;
    }

    return [true, `${R}${appendChars}`];
  }

  private takeRestOfChars(command: string): string {
    const [at, ...restChar] = command.split("");

    return restChar.join("");
  }

  /**
   * Non-negative for immediate value
   * @param command
   * @returns
   */
  isValid(command: string): boolean {
    for (const char of command) {
      if (char === ";" || char === "=" || char === "-") return false;
    }
    return true;
  }
}
