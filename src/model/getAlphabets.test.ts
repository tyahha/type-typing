import { getAlphabets } from "./getAlphabets";

describe("getAlphabet", () => {
  test("あいうえお", () => {
    expect(getAlphabets("ここここ")).toStrictEqual(["AIUEO"]);
  });
  test("ねんぶつ", () => {
    expect(getAlphabets("ねんぶつ")).toStrictEqual([
      "NENNBUTU",
      "NENBUTU",
      "NENNBUTSU",
      "NENBUTSU"
    ]);
  });
  test("かきくけこ", () => {
    expect(getAlphabets("かきくけこ")).toBe(["KAKIKUKEKO"]);
  });
  test("きゃきゅきょあいう", () => {
    expect(getAlphabets("きゃきゅきょあいう")).toBe(["KYAKYUKYOAIU"]);
  });
});
