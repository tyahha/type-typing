import { Time } from "../model/Time";

export const formatTime = (time: Time): string =>
  `${time.hour ? `${time.hour}時間` : ""}${
    time.minute ? `${time.minute}分` : ""
  }${time.second}秒${time.milli}`;
