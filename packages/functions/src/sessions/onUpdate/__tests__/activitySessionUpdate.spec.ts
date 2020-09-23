import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activitySessionResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import {roomSessionResponse} from "@sentrei/functions/__dummy__/Session";
import Activity from "@sentrei/types/models/Activity";
import Session from "@sentrei/types/models/Session";

import activitySessionUpdate from "../activitySessionUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Return when there are no changes", async done => {
  const after = {
    data: (): Session.Response => roomSessionResponse,
  };
  const before = {
    data: (): Session.Response => roomSessionResponse,
  };
  const changes = {after, before};
  const context = {params: {sessionId: "sessionId"}};

  const wrapped = testEnv.wrap(activitySessionUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalled();
  expect(db.collection).not.toHaveBeenCalled();
  done();
});

test("Invoke a request to add a new item to activities", async done => {
  const afterData: Session.Response = {
    ...roomSessionResponse,
    duration: 100,
  };
  const beforeData: Session.Response = {
    ...roomSessionResponse,
    duration: 0,
  };
  const after = {
    data: (): Session.Response => afterData,
  };
  const before = {
    data: (): Session.Response => beforeData,
  };

  const changes = {after, before};
  const context = {params: {sessionId: "sessionId"}};
  const expected: Activity.UpdateSession = {
    ...activitySessionResponseUpdated,
    action: "updated",
    category: "sessions",
    after: afterData,
    before: beforeData,
    value: 100,
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activitySessionUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(expected);
  done();
});
