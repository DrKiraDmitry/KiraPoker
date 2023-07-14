const plus = (a: string, b: string) => a + b;
const minus = (a: string) => a.slice(0, -1);
const isBackspace = (a: string, b: string) => ("Backspace" === b ? minus(a) : plus(a, b));

export const inputHelperRules = (prev: string, char: string) => isBackspace(prev, char);
