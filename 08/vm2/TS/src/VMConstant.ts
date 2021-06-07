export enum VMConstants {
  // RAM constant
  SP = 0, // stack pointer
  LOCAL = 1, // segment
  ARGUMENT = 2, // segment
  THIS = 3, // segment
  THAT = 4, // segment
  TEMP = 5, // segment
  R13 = 13, // general purpose reg
  R14 = 14, //general purpose reg
  R15 = 15, // general purpose reg
  // virtual
  C_ARITHMETIC = 30,
  ADD = 301,
  SUB = 302,
  NEG = 303,
  EQ = 304,
  GT = 305,
  LT = 306,
  AND_ = 307,
  OR_ = 308,
  NOT_ = 309,
  PUSH = 31,
  POP = 32,
  LABEL = 33,
  GOTO = 34,
  IF_GOTO = 35,
  FUNCTION = 36,
  RETURN_ = 37,
  CALL = 38,
  CONSTANT = 39, // segment
  STATIC = 40, // segment
  POINTER = 41, // segment
}
