// push constant17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@eqTrue0
D;JEQ
@SP
A=M-1
M=0
(eqTrue0)
// push constant17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@eqTrue1
D;JEQ
@SP
A=M-1
M=0
(eqTrue1)
// push constant16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@eqTrue2
D;JEQ
@SP
A=M-1
M=0
(eqTrue2)
// push constant892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@ltTrue3
D;JLT
@SP
A=M-1
M=0
(ltTrue3)
// push constant891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@ltTrue4
D;JLT
@SP
A=M-1
M=0
(ltTrue4)
// push constant891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@ltTrue5
D;JLT
@SP
A=M-1
M=0
(ltTrue5)
// push constant32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@gtTrue6
D;JGT
@SP
A=M-1
M=0
(gtTrue6)
// push constant32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@gtTrue7
D;JGT
@SP
A=M-1
M=0
(gtTrue7)
// push constant32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
M=-1
@gtTrue8
D;JGT
@SP
A=M-1
M=0
(gtTrue8)
// push constant57
@57
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant31
@31
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant53
@53
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
M=M+1
// push constant112
@112
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
M=M+1
@SP
A=M-1
M=-M
@SP
AM=M-1
D=M
@SP
A=M-1
M=D&M
// push constant82
@82
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
A=M-1
M=D|M
@SP
A=M-1
M=!M
