"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parser_1 = require("./parser");
const commandTypes_1 = require("./commandTypes");
const codeWriter_1 = require("./codeWriter");
const PARSE_PATH = path_1.default.join(__dirname, process.argv[2]);
const FILE_NAME = process.argv[2].split(".")[0];
const ws = fs_1.default.createWriteStream(path_1.default.join(__dirname, `${FILE_NAME}.asm`));
/**
 * as per specification, first pass or loop we need to add labels into our predefined table
 *
 * I will also validate on first loop
 */
async function VMTranslator() {
    const parser = new parser_1.Parser();
    const cw = new codeWriter_1.CodeWriter();
    const readLine = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(PARSE_PATH),
    });
    for await (const command of readLine) {
        parser.parseCommand(command);
        const comType = parser.commandType();
        if (comType === commandTypes_1.CommandTypes.C_POP || comType === commandTypes_1.CommandTypes.C_PUSH) {
            // console.log(command, "---", parser.commandType(), parser.arg1, parser.arg2);
            ws.write(cw.writePushPop(comType, parser.arg1, parser.arg2));
        }
        else if (comType === commandTypes_1.CommandTypes.C_ARITHMETIC) {
            // console.log("arr0", parser.arg0);
            ws.write(cw.writeArithmetic(parser.arg0));
        }
    }
}
async function bar() {
    const readLine = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(PARSE_PATH),
    });
    for await (const command of readLine) {
    }
}
(async () => {
    await VMTranslator();
})();
