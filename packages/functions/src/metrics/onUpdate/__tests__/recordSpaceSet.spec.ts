import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {analyticsLatestResponse} from "@sentrei/functions/__dummy__/Analytics";
import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

import recordSpaceSet from "../recordSpaceSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add new metrics to space collection", async done => {
  const snap = {
    before: {data: (): Analytics.Response => analyticsLatestResponse},
  };

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(recordSpaceSet);
  const context = {params: {spaceId: "spaceId", memberId: "userId"}};
  const req = await wrapped(snap, context);
  const metricsData: Metrics.Update = {
    record: 1,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {merge: true});
  done();
});
