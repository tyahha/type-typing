import { MultiJaImputs, SingleJaInputs } from "./jaUnit";

const jaInputs = [...MultiJaImputs, ...SingleJaInputs];

// N1回で入力できる「ん」を探す、変換する正規表現
const nnToNRegExp = /NN([^AIUEON])/g;

export const getAlphabets = (kana: string): string[] => {
  const alphabets = inner(kana);
  return alphabets.reduce<string[]>((acc, c) => {
    return c.match(nnToNRegExp) == null
      ? acc.concat(c)
      : acc.concat([c, c.replace(nnToNRegExp, "N$1")]);
  }, []);
};

// 「ん」の特別処理をしないアルファベット入力
const inner = (kana: string): string[] => {
  const candidates = jaInputs.filter(e => kana.indexOf(e.kana) === 0);
  if (candidates.length > 0) {
    return candidates.reduce<string[]>((acc, c) => {
      const remain = kana.slice(c.kana.length);
      if (remain.length === 0) {
        return acc.concat(c.keys);
      }

      const remainKeys = inner(remain);

      c.keys.forEach(k => {
        remainKeys.forEach(rk => {
          acc.push(k + rk);
        });
      });

      return acc;
    }, []);
  }

  throw new Error(`not match kana: ${kana}`);
};
