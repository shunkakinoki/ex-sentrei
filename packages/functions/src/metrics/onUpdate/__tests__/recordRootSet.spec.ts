import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {analyticsLatestResponse} from "@sentrei/functions/__dummy__/Analytics";
import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

import recordRootSet from "../recordRootSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add new metrics to root collection", async done => {
  const snap = {
    before: {data: (): Analytics.Response => analyticsLatestResponse},
  };

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(recordRootSet);
  const context = {params: {userId: "userId"}};
  const req = await wrapped(snap, context);
  const metricsData: Metrics.Update = {
    period: {
      hour: 1,
      day: 1,
      week: 1,
    },
    record: 1,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {merge: true});
  done();
});
