import readline from "readline";
import fs, { Dirent, readdirSync } from "fs";
import path from "path";

import { Parser } from "./Parser";
// import { CommandTypes } from "./commandTypes";
import { CodeWriter } from "./CodeWriter";

const PARSE_PATH = path.join(__dirname, process.argv[2]);

let FILE_NAME: string;
let PATH_FILE: string;

(async () => {
  if (fs.lstatSync(PARSE_PATH).isDirectory()) {
    console.info("DIRECTORY");
    // TODO: DIRECTORY
    FILE_NAME = process.argv[2].split("/").pop();
    PATH_FILE = path.join(__dirname, process.argv[2], `${FILE_NAME}.asm`);

    const files: Dirent[] = readdirSync(PARSE_PATH, { withFileTypes: true });
    for (const file of files) {
      if (path.extname(file.name) === ".vm") {
        await VMTranslator(path.join(__dirname, process.argv[2], file.name));
      }
    }
  } else {
    // TODO: FILE
    console.info("FILE");
    FILE_NAME = process.argv[2].split("/").pop().slice(0, -3);
    PATH_FILE = path.join(__dirname, `${FILE_NAME}.asm`);
    await VMTranslator(path.join(__dirname, process.argv[2]));
  }
})();

const ws = fs.createWriteStream(PATH_FILE);

async function VMTranslator(fileName: string) {
  const parser = new Parser();
  const cw = new CodeWriter();
  const readLine = readline.createInterface({
    input: fs.createReadStream(fileName),
  });
  for await (const command of readLine) {
    console.log(command, "---------");
    // parser.parseCommand(command);
    // const comType = parser.commandType();
    // if (comType === CommandTypes.C_POP || comType === CommandTypes.C_PUSH) {
    //   // console.log(command, "---", parser.commandType(), parser.arg1, parser.arg2);
    //   ws.write(cw.writePushPop(comType, parser.arg1, parser.arg2));
    // } else if (comType === CommandTypes.C_ARITHMETIC) {
    //   // console.log("arr0", parser.arg0);
    //   ws.write(cw.writeArithmetic(parser.arg0));
    // }
  }
}
