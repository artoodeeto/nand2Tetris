"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandTypes = void 0;
var CommandTypes;
(function (CommandTypes) {
    CommandTypes[CommandTypes["C_ARITHMETIC"] = 0] = "C_ARITHMETIC";
    CommandTypes[CommandTypes["C_PUSH"] = 1] = "C_PUSH";
    CommandTypes[CommandTypes["C_POP"] = 2] = "C_POP";
    CommandTypes[CommandTypes["C_LABEL"] = 3] = "C_LABEL";
    CommandTypes[CommandTypes["C_GOTO"] = 4] = "C_GOTO";
    CommandTypes[CommandTypes["C_IF"] = 5] = "C_IF";
    CommandTypes[CommandTypes["C_FUNCTION"] = 6] = "C_FUNCTION";
    CommandTypes[CommandTypes["C_RETURN"] = 7] = "C_RETURN";
    CommandTypes[CommandTypes["C_CALL"] = 8] = "C_CALL";
})(CommandTypes = exports.CommandTypes || (exports.CommandTypes = {}));
