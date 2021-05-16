"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _cType, __command;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const commandTypes_1 = require("./commandTypes");
class Parser {
    constructor() {
        _cType.set(this, new Map([
            ["sub", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["add", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["neg", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["eq", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["gt", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["lt", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["and", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["or", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["not", commandTypes_1.CommandTypes.C_ARITHMETIC],
            ["push", commandTypes_1.CommandTypes.C_PUSH],
            ["pop", commandTypes_1.CommandTypes.C_POP],
        ]));
        __command.set(this, []);
    }
    /**
     * Returns a constant representing the type of the current command.
     * C_ARITHMETIC is returned for all the arithmetic/logical commands
     * @returns CommandTypes
     */
    commandType() {
        const { 0: com } = __classPrivateFieldGet(this, __command);
        // console.log("com", com);
        const type = __classPrivateFieldGet(this, _cType).get(com);
        // if (!type) throw new Error("Syntax Error");
        return type;
    }
    get arg0() {
        const { 0: com } = __classPrivateFieldGet(this, __command);
        return com;
    }
    /**
     * Returns the first argument of the current command.
     * In the case C_ARITHMETIC, the command itself (add, sub, etc.) is returned.
     * Should not be called if the current command is C_RETURN
     * @returns
     */
    get arg1() {
        const { 1: first } = __classPrivateFieldGet(this, __command);
        return first;
    }
    /**
     * Returns the second argument of the current command.
     * Should be called if the current is
     * C_PUSH, C_POP, C_FUNCTION, OR C_CALL
     * @returns
     */
    get arg2() {
        const { 2: sec } = __classPrivateFieldGet(this, __command);
        return Number(sec);
    }
    parseCommand(command) {
        // strips comments
        const strippedCommand = command.trim().split("/")[0];
        // console.log("strp", strippedCommand);
        if (strippedCommand) {
            __classPrivateFieldSet(this, __command, strippedCommand.split(" "));
        }
    }
}
exports.Parser = Parser;
_cType = new WeakMap(), __command = new WeakMap();
