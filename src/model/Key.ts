export type Key = string | undefined | SizedKey;

export interface SizedKey {
  char?: string;
  type: KeySize;
}

export enum KeySize {
  OneHalf,
  Double,
  DoubleHalf,
  Space
}
