import { jaUnits, geminateConsonant, JaUnit } from "./jaUnit";

export const getJaUnitCandidates = (
  kana: string,
  inputedKeys: string
): JaUnit[] => {
  const ret = (() => {
    if (kana[0] === "っ") {
      const remain = kana.slice(1);
      if (
        remain.length === 0 ||
        (inputedKeys.length !== 0 &&
          geminateConsonant.keys.some(e => e.startsWith(inputedKeys))) ||
        "あいうえおっ".includes(remain[0])
      ) {
        return [geminateConsonant];
      } else {
        const candicates = getJaUnitCandidates(remain, "").map(c => ({
          kana: `っ${c.kana}`,
          keys: c.keys.map(k => k[0] + k)
        }));

        if (inputedKeys.length !== 0) {
          return candicates.filter(c =>
            c.keys.some(k => k.startsWith(inputedKeys))
          );
        } else {
          return [...candicates, geminateConsonant];
        }
      }
    }

    return jaUnits.filter(
      e =>
        kana.startsWith(e.kana) &&
        (inputedKeys.length === 0 ||
          e.keys.some(k => k.startsWith(inputedKeys)))
    );
  })();

  if (inputedKeys.length !== 0) {
    return ret.map(e => {
      return {
        kana: e.kana,
        keys: e.keys.filter(k => k.startsWith(inputedKeys))
      };
    });
  } else {
    return ret;
  }
};
