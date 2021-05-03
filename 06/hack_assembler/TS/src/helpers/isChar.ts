export function isCharacter(char: string): boolean {
  const A = 65;
  const Z = 90;
  const a = 97;
  const z = 122;
  const code = char.charCodeAt(0);
  return (code >= A && code <= Z) || (code >= a && code <= z);
}
