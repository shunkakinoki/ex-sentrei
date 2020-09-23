import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activitySessionResponseCreated} from "@sentrei/functions/__dummy__/Activity";
import {memberSessionResponse} from "@sentrei/functions/__dummy__/Session";
import Session from "@sentrei/types/models/Session";

import activitySessionCreate from "../activitySessionCreate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new session to activities", async done => {
  const snap = {
    data: (): Session.Response => memberSessionResponse,
  };
  const context = {
    params: {sessionId: "sessionId"},
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activitySessionCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activitySessionResponseCreated,
  );
  done();
});
