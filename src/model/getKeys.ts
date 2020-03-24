import { getJaUnitCandidates } from "./getJaUnitCandidates";

export const getKeys = (kana: string, inputedKeys: string): string => {
  if (kana.length === 0) return "";
  const candidates = getJaUnitCandidates(kana, inputedKeys);
  if (candidates.length > 0) {
    const candidate = candidates[0];
    const remain = kana.slice(candidate.kana.length);
    return candidate.keys[0] + (remain.length === 0 ? "" : getKeys(remain, ""));
  }
  throw new Error(`not match kana: ${kana}`);
};
