import { getJaUnitCandidates } from "./getJaUnitCandidates";

describe("getJaUnitCandidates", () => {
  test("test", () => {
    expect(getJaUnitCandidates("き", "")).toStrictEqual(["AIUEO"]);
  });
});
