import { getAlphabet } from "./getAlphabet";

describe("getAlphabet", () => {
  test("あいうえお", () => {
    expect(getAlphabet("あいうえお")).toBe("AIUEO");
  });
  test("かきくけこ", () => {
    expect(getAlphabet("かきくけこ")).toBe("KAKIKUKEKO");
  });
  test("きゃきゅきょあいう", () => {
    expect(getAlphabet("きゃきゅきょあいう")).toBe("KYAKYUKYOAIU");
  });
});
