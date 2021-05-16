// push constant111
@111
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant333
@333
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant888
@888
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop static8
@SP
AM=M-1
D=M
@foo.8
M=D
// pop static3
@SP
AM=M-1
D=M
@foo.3
M=D
// pop static1
@SP
AM=M-1
D=M
@foo.1
M=D
// push static3
@foo.3
D=M
@SP
A=M
M=D
@SP
M=M+1
// push static1
@foo.1
D=M
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
// push static8
@foo.8
D=M
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
