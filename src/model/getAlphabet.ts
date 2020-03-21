import { MultiJaImputs, SingleJaInputs } from "./jaUnit";

export const getAlphabet = (kana: string): string => {
  const multiCandidate = MultiJaImputs.filter(e => kana.indexOf(e.kana) === 0);
  if (multiCandidate.length > 0) {
    const candidate = multiCandidate[0];
    const remain = kana.slice(candidate.kana.length);
    return candidate.keys[0] + (remain.length === 0 ? "" : getAlphabet(remain));
  }
  const singleCandidate = SingleJaInputs.filter(
    e => kana.indexOf(e.kana) === 0
  );
  if (singleCandidate.length > 0) {
    const candidate = singleCandidate[0];
    const remain = kana.slice(candidate.kana.length);
    return candidate.keys[0] + (remain.length === 0 ? "" : getAlphabet(remain));
  }

  throw new Error(`not match kana: ${kana}`);
};
