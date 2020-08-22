/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: declare module dayjs
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const timeAgo = (seconds: number): any => {
  // convert to milliseconds,
  const milliseconds = seconds * 1000;
  // JS Date object accepts ms value
  const date = new Date(milliseconds);
  // @ts-ignore
  return dayjs(date).fromNow(); // 1 year ago
};

export default timeAgo;
