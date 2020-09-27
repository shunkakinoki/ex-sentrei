import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {analyticsLatestResponse} from "@sentrei/functions/__dummy__/Analytics";
import Metrics from "@sentrei/types/models/Metrics";
import Analytics from "@sentrei/types/models/Analytics";

import recordMemberSet from "../recordMemberSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add new metrics to member collection", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId")
    .mockReturnValue("memberRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId/admin/metrics")
    .mockReturnValue("metricsRef");

  const snap = {
    before: {data: (): Analytics.Response => analyticsLatestResponse},
  };
  const context = {params: {spaceId: "spaceId", memberId: "userId"}};
  const wrapped = testEnv.wrap(recordMemberSet);
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
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.batch().set).toHaveBeenCalledWith("memberRef", metricsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("metricsRef", metricsData, {
    merge: true,
  });
  done();
});
