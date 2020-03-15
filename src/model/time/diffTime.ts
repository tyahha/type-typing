import { Time } from ".";

const aSecond = 1000;
const aMinite = aSecond * 60;
const anHour = aMinite * 60;

export const diffTime = (from: number, to: number): Time => {
  let diff = to - from;
  const hour = Math.floor(diff / anHour);
  diff -= hour * anHour;

  const minute = Math.floor(diff / aMinite);
  diff -= minute * aMinite;

  const second = Math.floor(diff / aSecond);
  diff -= second * aSecond;

  return {
    hour,
    minute,
    second,
    milli: diff
  };
};
