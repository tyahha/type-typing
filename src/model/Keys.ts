export const line1Keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-"
];

export const line2Keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "@"
];

export const line3Keys = [
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  ";",
  ":"
];

export const line4Keys = [
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  ",",
  ".",
  "/",
  "\\"
];

const allKeys = [...line1Keys, ...line2Keys, ...line3Keys, ...line4Keys];

export const containKeyLines = (c: string): boolean => allKeys.includes(c);
