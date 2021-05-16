import readline from "readline";
import fs from "fs";
import path from "path";

import { Parser } from "./parser";
import { CommandTypes } from "./commandTypes";
import { CodeWriter } from "./codeWriter";

const PARSE_PATH = path.join(__dirname, process.argv[2]);
const FILE_NAME = process.argv[2].split(".")[0];

const ws = fs.createWriteStream(path.join(__dirname, `${FILE_NAME}.asm`));

/**
 * as per specification, first pass or loop we need to add labels into our predefined table
 *
 * I will also validate on first loop
 */
async function VMTranslator() {
  const parser = new Parser();
  const cw = new CodeWriter();
  const readLine = readline.createInterface({
    input: fs.createReadStream(PARSE_PATH),
  });

  for await (const command of readLine) {
    parser.parseCommand(command);
    const comType = parser.commandType();

    if (comType === CommandTypes.C_POP || comType === CommandTypes.C_PUSH) {
      // console.log(command, "---", parser.commandType(), parser.arg1, parser.arg2);
      ws.write(cw.writePushPop(comType, parser.arg1, parser.arg2));
    } else if (comType === CommandTypes.C_ARITHMETIC) {
      // console.log("arr0", parser.arg0);
      ws.write(cw.writeArithmetic(parser.arg0));
    }
  }
}

async function bar() {
  const readLine = readline.createInterface({
    input: fs.createReadStream(PARSE_PATH),
  });
  for await (const command of readLine) {
  }
}

(async () => {
  await VMTranslator();
})();
