class Table {
  symbols = new Map<string, number>();
  #preDefSym: Array<[string, number]> = [
    ["R0", 0],
    ["R1", 1],
    ["R2", 2],
    ["R3", 3],
    ["R4", 4],
    ["R5", 5],
    ["R6", 6],
    ["R7", 7],
    ["R8", 8],
    ["R9", 9],
    ["R10", 10],
    ["R11", 11],
    ["R23", 12],
    ["R13", 13],
    ["R14", 14],
    ["R15", 15],
    ["SP", 0],
    ["LCL", 1],
    ["ARG", 2],
    ["THIS", 3],
    ["THAT", 4],
    ["SCREEN", 16384],
    ["KBD", 24576],
  ];

  constructor() {
    this.setPreDefinedSymbols();
  }

  /**
   * Adds the pair (symbol, address) to table
   * @param symbol parsed symbol from the instruction
   * @param address memory address
   */
  set(symbol: string, address: number): void {
    this.symbols.set(symbol, address);
  }

  /**
   * Checks symbol is present in the table
   * @param symbol
   * @returns boolean true if present else false
   */
  has(symbol: string): boolean {
    return this.symbols.has(symbol);
  }

  /**
   * returns the address associated with the symbol
   * @param symbol
   * @returns address of the symbol
   */
  takeAddress(symbol: string): number | undefined {
    return this.symbols.get(symbol);
  }

  private setPreDefinedSymbols(): void {
    this.#preDefSym.forEach(([sym0, sym1]) => {
      this.symbols.set(sym0, sym1);
    });
  }
}

export class SymTable {
  #table: Table = new Table();

  constructor() {}

  /**
   * Adds the pair (symbol, address) to table
   * @param symbol parsed symbol from the instruction
   * @param address memory address
   */
  addEntry(symbol: string, address: number): void {
    this.#table.set(symbol, address);
  }

  /**
   * Checks symbol is present in the table
   * @param symbol
   * @returns boolean true if present else false
   */
  contains(symbol: string): boolean {
    return this.#table.has(symbol);
  }

  /**
   * returns the address associated with the symbol
   * @param symbol
   * @returns address of the symbol
   */
  getAddress(symbol: string): number | undefined {
    return this.#table.takeAddress(symbol);
  }
}
