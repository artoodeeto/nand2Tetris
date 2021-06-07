import { CommandTypes } from "./commandTypes";

export class Parser {
  #cType: Map<string, CommandTypes> = new Map([
    ["sub", CommandTypes.C_ARITHMETIC],
    ["add", CommandTypes.C_ARITHMETIC],
    ["neg", CommandTypes.C_ARITHMETIC],
    ["eq", CommandTypes.C_ARITHMETIC],
    ["gt", CommandTypes.C_ARITHMETIC],
    ["lt", CommandTypes.C_ARITHMETIC],
    ["and", CommandTypes.C_ARITHMETIC],
    ["or", CommandTypes.C_ARITHMETIC],
    ["not", CommandTypes.C_ARITHMETIC],
    ["push", CommandTypes.C_PUSH],
    ["pop", CommandTypes.C_POP],
  ]);

  #_command: Array<string> = [];

  constructor() {}

  /**
   * Returns a constant representing the type of the current command.
   * C_ARITHMETIC is returned for all the arithmetic/logical commands
   * @returns CommandTypes
   */
  commandType(): CommandTypes | undefined {
    const { 0: com } = this.#_command;
    // console.log("com", com);
    const type = this.#cType.get(com);
    // if (!type) throw new Error("Syntax Error");
    return type;
  }

  get arg0(): string {
    const { 0: com } = this.#_command;
    return com;
  }

  /**
   * Returns the first argument of the current command.
   * In the case C_ARITHMETIC, the command itself (add, sub, etc.) is returned.
   * Should not be called if the current command is C_RETURN
   * @returns
   */
  get arg1(): string {
    const { 1: first } = this.#_command;
    return first;
  }

  /**
   * Returns the second argument of the current command.
   * Should be called if the current is
   * C_PUSH, C_POP, C_FUNCTION, OR C_CALL
   * @returns
   */
  get arg2(): number {
    const { 2: sec } = this.#_command;
    return Number(sec);
  }

  parseCommand(command: string): void {
    // strips comments
    const strippedCommand = command.trim().split("/")[0];
    if (strippedCommand) {
      this.#_command = strippedCommand.split(" ");
    }
  }
}
