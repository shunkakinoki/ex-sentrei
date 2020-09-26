import Analytics from "@sentrei/types/models/Analytics";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";

// eslint-disable-next-line import/prefer-default-export
export const analyticsLatestResponse: Analytics.Response = {
  metrics: {record: 0},
  model: "user",
  period: "latest",
  updatedAt: timestamp,
};
