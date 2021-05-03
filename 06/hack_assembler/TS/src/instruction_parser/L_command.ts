import { isCharacter } from "../helpers/isChar";
import { ICommand } from "../interfaces/command";

/**
 * parsing L instruction
 * (xxx) where xxx is a symbol
 */
export class LInstructionParser implements ICommand {
  #leftBracket: Map<string, string> = new Map([["(", ")"]]);
  #rightBracket: Map<string, string> = new Map([[")", "("]]);
  #bracketStack: Array<string> = [];
  #_currentValidChars: string = "";

  constructor() {}
  parse(command: string): string {
    for (const char of command) {
      if (!this.#leftBracket.has(char) && !this.#rightBracket.has(char)) {
        this.#_currentValidChars += char;
      }
    }

    return this.#_currentValidChars;
  }

  /**
   * accept all characters as label except ';' and '='
   * label could be:
   *  (ABC123)
   *  (ABC)
   *  (123!@#)
   * @param command
   * @returns boolean
   */
  isValid(command: string): boolean {
    // renew current chars state so it wont append the prev chars
    this.#_currentValidChars = "";

    for (const char of command) {
      if (char === "/") break; // ignore inline comments
      if (char === ";" || char === "=") return false;

      if (this.#leftBracket.has(char)) {
        this.#bracketStack.push(char);
      } else if (this.#rightBracket.has(char)) {
        if (this.#bracketStack.length === 0) return false;
        const leftBra = this.#rightBracket.get(char);

        const stackedBra = this.#bracketStack.pop();

        if (leftBra && stackedBra !== leftBra) return false;
      }
    }
    return this.#bracketStack.length === 0;
  }
}
