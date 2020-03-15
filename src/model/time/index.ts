import { diffTime } from "./diffTime";
import { formatTime } from "./formatTime";

export interface Time {
  hour: number;
  minute: number;
  second: number;
  milli: number;
}

export { diffTime, formatTime };
