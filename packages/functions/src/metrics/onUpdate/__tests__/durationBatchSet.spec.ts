import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {memberSessionResponse} from "@sentrei/functions/__dummy__/Session";
import Metrics from "@sentrei/types/models/Metrics";
import Session from "@sentrei/types/models/Session";

import durationBatchSet from "../durationBatchSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add new analytics to member collection", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/admin/metrics")
    .mockReturnValue("roomRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/metrics")
    .mockReturnValue("spaceRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("users/userId/admin/metrics")
    .mockReturnValue("userRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId/admin/metrics")
    .mockReturnValue("memberRef");

  const snap = {
    after: {data: (): Session.Response => memberSessionResponse},
  };
  const wrapped = testEnv.wrap(durationBatchSet);
  const req = await wrapped(snap);
  const metricsData: Metrics.Update = {
    duration: 3,
    member: {
      duration: 3,
      focus: 3,
    },
    type: {
      focus: 3,
    },
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/metrics");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/metrics",
  );
  expect(db.batch().set).toHaveBeenCalledWith("roomRef", metricsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", metricsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("userRef", metricsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("memberRef", metricsData, {
    merge: true,
  });
  done();
});
