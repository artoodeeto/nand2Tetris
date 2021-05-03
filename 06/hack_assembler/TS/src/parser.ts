import { Code } from "./code";
import { SymTable } from "./sym_table";
import { decimalToAnyBase } from "any-to-any";
import { Command_Types } from "./enums/command_type";
import { LInstructionParser } from "./instruction_parser/L_command";
import { AInstructionParser } from "./instruction_parser/A_command";
import { CInstructionParser } from "./instruction_parser/C_command";
import { ICommand } from "./interfaces/command";

export class Parser {
  #_symTable: SymTable;

  #_dest!: string;
  #_compute!: string;
  #_jump!: string;
  #_cmd_type!: Command_Types | null;
  A_bin!: string;
  #lineCounter: number = 0;
  #ACounter: number = 16; // starting address of variables
  #L_Inst: LInstructionParser;
  #A_Inst: AInstructionParser;
  #C_Inst: CInstructionParser;

  constructor(symTable: SymTable) {
    this.#_symTable = symTable;
    this.#L_Inst = new LInstructionParser();
    this.#A_Inst = new AInstructionParser();
    this.#C_Inst = new CInstructionParser();
  }

  /**
   * are there more lines in the input?
   * @returns
   */
  hasMoreCommands(): boolean {
    return true;
  }

  /**
   * Reads the next command from the input and makes it current command
   * Takes care of whitespace, if necessary
   * Should be called ony if hasMoreCommands() is true
   * Initially there is no current command
   */
  advance(): void {}

  /**
   * Returns the type of the current command:
   * A_COMMAND for @xxxx where is either a symbol or a decimal number
   * C_COMMAND for dest = comp ; jump
   * L_COMMAND for (xxx) where xx is a symbol
   * @returns
   */
  commandType(): Command_Types | null {
    return this.#_cmd_type;
  }

  /**
   * Returns the symbol or decimal xxx of the current command @xxx or (xxx)
   * Should be called only when commandType() is A_COMMAND or L_COMMAND
   * @returns
   */
  symbol(): void {
    return;
  }

  /**
   * Returns the dest mnemonic in the current C-command (8 possibilities)
   * Should be called only when commandType() is C_COMMAND
   * @returns
   */
  get destination(): string {
    return this.#_dest;
  }

  /**
   * Returns the comp mnemonic in the current C-command (28 possibilities)
   * Should be called only when commandType() is C_COMMAND
   * @returns
   */
  get compute(): string {
    return this.#_compute;
  }

  /**
   * Returns the jump mnemonic in the current C-command (8 possibilities)
   * Should be called only when commandType() is C_COMMAND
   * @returns
   */
  get jump(): string {
    return this.#_jump;
  }

  validateCommands(command: string): void {
    const trimCommand = command.trim().split(" ").join("");
    const firstChar = trimCommand[0];
    let isAValid = false;
    let isLValid = false;
    let isCValid = false;

    if (firstChar !== "/" && firstChar) {
      this.#lineCounter++;
      if (firstChar === "(") {
        // L instruction
        isLValid = this.isSyntaxValid(this.#L_Inst, command);
        if (isLValid) {
          --this.#lineCounter;
          this.addEntryToTable(command);
        }
      } else if (firstChar === "@") {
        // A instruction
        isAValid = this.isSyntaxValid(this.#A_Inst, command);
      } else {
        // C instruction
        isCValid = this.isSyntaxValid(this.#C_Inst, command);
      }
      // at least one should be valid syntax
      if (!isLValid && !isAValid && !isCValid) throw new Error("Syntax Error");
    }
  }

  private addEntryToTable(command: string): void {
    const parsedL = this.#L_Inst.parse(command);
    if (!this.#_symTable.contains(parsedL)) {
      this.#_symTable.addEntry(parsedL, this.#lineCounter);
    }
  }

  private isSyntaxValid(inst: ICommand, command: string): boolean {
    return inst.isValid(command);
  }

  parse(command: string): void {
    const trimCommand = command.trim().split(" ").join("");
    const firstChar = trimCommand[0];

    // set to null, because every previous type will retain its value
    this.#_cmd_type = null;

    if (firstChar !== "/" && firstChar && firstChar !== "(") {
      if (firstChar === "@") {
        this.#_cmd_type = Command_Types.A_COMMAND;
        const parsedAInstruction = this.#A_Inst.parse(trimCommand);
        this.transformAtoBinary(parsedAInstruction);
      } else {
        this.#_cmd_type = Command_Types.C_COMMAND;
        this.#C_Inst.parse(trimCommand);
        this.#_compute = this.#C_Inst.comp;
        this.#_jump = this.#C_Inst.jmp;
        this.#_dest = this.#C_Inst.dest;
      }
    }
  }

  private transformAtoBinary(parsedCommand: string | number): void {
    if (Number.isInteger(parsedCommand) && typeof parsedCommand === "number") {
      this.A_bin = this.AInstructionToBinary(parsedCommand);
      return;
    } else if (typeof parsedCommand === "string") {
      const isInTable = this.#_symTable.contains(parsedCommand);
      if (isInTable) {
        const addressA = this.#_symTable.getAddress(parsedCommand);
        if (addressA || addressA === 0) this.A_bin = this.AInstructionToBinary(addressA);
      } else {
        this.A_bin = this.AInstructionToBinary(this.#ACounter);
        this.#_symTable.addEntry(parsedCommand, this.#ACounter++);
      }
    }
  }

  private AInstructionToBinary(num: number): string {
    const numOfBits = 16;

    const binValue = decimalToAnyBase(Number(num), 2);
    const diffZeroes = numOfBits - `${binValue}`.length;
    const leadingZeros = this.addLeadingZeroOnAInstruction(diffZeroes);
    return `${leadingZeros}${binValue}`;
  }

  private addLeadingZeroOnAInstruction(num: number): string {
    return Array(Math.abs(num)).fill(0).join("");
  }
}
