export interface ICommand {
  parse(command: string): string | number;
  isValid(command: string): boolean;
}
