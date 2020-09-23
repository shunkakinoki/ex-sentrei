import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activitySpaceResponseDeleted} from "@sentrei/functions/__dummy__/Activity";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Space from "@sentrei/types/models/Space";

import activitySpaceDelete from "../activitySpaceDelete";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new delete to activities", async done => {
  const snap = {
    data: (): Space.Response => spaceResponse,
  };
  const context = {params: {spaceId: "spaceId"}};

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activitySpaceDelete);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activitySpaceResponseDeleted,
  );
  done();
});
