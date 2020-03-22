import { Problem } from "./problem";
import { formatTime, diffTime } from "./time";

export type ResultItem = [string, string];

export const createResult = (
  startTime: number,
  endTime: number,
  problems: Problem[],
  misses: Map<string, number>,
  allInputKeyCount: number
): ResultItem[] => {
  const missStrings = [...misses]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([s, num]) => `${s}(${num}回)`);

  const allMissTypeCount = Array.from(misses.values()).reduce(
    (acc, c) => acc + c,
    0
  );

  return [
    ["入力時間", formatTime(diffTime(startTime, endTime))],
    ["入力キー数", `${allInputKeyCount}回`],
    ["総ミスタイプ数", `${allMissTypeCount}回`],
    [
      "WPM",
      `${Math.floor((allInputKeyCount / (endTime - startTime)) * (1000 * 60))}`
    ],
    [
      "正誤率",
      `${Math.floor(
        (allInputKeyCount / (allInputKeyCount + allMissTypeCount)) * 100
      )}%`
    ],
    ["ミスしやすいキー", missStrings.join(", ")]
  ];
};
