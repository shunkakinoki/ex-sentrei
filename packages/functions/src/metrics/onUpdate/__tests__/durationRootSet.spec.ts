import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {memberSessionResponse} from "@sentrei/functions/__dummy__/Session";
import Metrics from "@sentrei/types/models/Metrics";
import Session from "@sentrei/types/models/Session";

import durationRootSet from "../durationRootSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add new analytics to root collection", async done => {
  const snap = {
    after: {data: (): Session.Response => memberSessionResponse},
  };

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(durationRootSet);
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
  expect(db.doc).toHaveBeenCalledWith("admin/metrics");
  expect(db.doc("").set).toHaveBeenCalledWith(metricsData, {merge: true});
  done();
});
