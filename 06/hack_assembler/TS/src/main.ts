import readline from "readline";
import fs from "fs";
import { SymTable } from "./sym_table";
import { Parser } from "./parser";
import { Command_Types } from "./enums/command_type";
import { Code } from "./code";

const PARSE_PATH = process.argv[2];
const FILE_NAME = process.argv[3];

const ws = fs.createWriteStream(`./hack_out/${FILE_NAME}.hack`);
const parser = new Parser(new SymTable());
const decoder = new Code();

/**
 * as per specification, first pass or loop we need to add labels into our predefined table
 *
 * I will also validate on first loop
 */
async function foo() {
  const readLine = readline.createInterface({
    input: fs.createReadStream(PARSE_PATH),
  });

  for await (const command of readLine) {
    // parser.parseSymbolsLabels(command);
    parser.validateCommands(command);
  }
}

async function bar() {
  const readLine = readline.createInterface({
    input: fs.createReadStream(PARSE_PATH),
  });
  for await (const command of readLine) {
    parser.parse(command);
    const cmdType = parser.commandType();
    if (cmdType === Command_Types.A_COMMAND) {
      console.log(`MAIN----${parser.A_bin}`, command, "\n");
      ws.write(`${parser.A_bin}\n`);
    }
    if (cmdType === Command_Types.C_COMMAND) {
      const comp = decoder.compute(parser.compute);
      const dest = decoder.destination(parser.destination);
      const jmp = decoder.jump(parser.jump);
      console.log(`MAIN:---111 comp:${comp}-dest:${dest}-jmp:${jmp}`, command, "\n");
      ws.write(`111${comp}${dest}${jmp}\n`);
    }
  }
}

(async () => {
  await foo();
  await bar();
})();

// readInt.on("line", (command) => {
//   // parser.validateCommands(command);
//   console.log("WHIT");
// });

// readInt.on("line", (line) => {
//   console.log("crap");
// parser.parse(line);
// const cmdType = parser.commandType();
// if (cmdType === Command_Types.A_COMMAND) {
//   console.log(`MAIN----${parser.A_bin}`, line, "\n");
//   ws.write(`${parser.A_bin}\n`);
// }
// if (cmdType === Command_Types.C_COMMAND) {
//   const comp = decoder.compute(parser.compute);
//   const dest = decoder.destination(parser.destination);
//   const jmp = decoder.jump(parser.jump);
//   console.log(`MAIN:---111 comp:${comp}-dest:${dest}-jmp:${jmp}`, line, "\n");
//   ws.write(`111${comp}${dest}${jmp}\n`);
// }
// });
