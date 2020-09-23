import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {
  memberSessionResponse,
  roomSessionResponse,
} from "@sentrei/functions/__dummy__/Session";
import Metrics from "@sentrei/types/models/Metrics";
import Session from "@sentrei/types/models/Session";

import durationUserSet from "../durationUserSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add new analytics to member collection", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("users/userId")
    .mockReturnValue("userRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId")
    .mockReturnValue("memberRef");

  const snap = {
    after: {data: (): Session.Response => memberSessionResponse},
  };
  const wrapped = testEnv.wrap(durationUserSet);
  const req = await wrapped(snap);
  const metricsField: Metrics.Update = {
    duration: 3,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.batch().set).toHaveBeenCalledWith("userRef", metricsField, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("memberRef", metricsField, {
    merge: true,
  });
  done();
});

test("Invoke a request to add new analytics to room collection", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("users/userId")
    .mockReturnValue("userRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId")
    .mockReturnValue("memberRef");

  const snap = {
    after: {data: (): Session.Response => roomSessionResponse},
  };
  const wrapped = testEnv.wrap(durationUserSet);
  const req = await wrapped(snap);
  const metricsField: Metrics.Update = {
    duration: 3,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/members/userId");
  expect(db.batch().set).toHaveBeenCalledWith("userRef", metricsField, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("memberRef", metricsField, {
    merge: true,
  });
  done();
});
