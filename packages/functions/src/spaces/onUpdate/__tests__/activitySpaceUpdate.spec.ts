import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activitySpaceResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Activity from "@sentrei/types/models/Activity";
import Space from "@sentrei/types/models/Space";

import activitySpaceUpdate from "../activitySpaceUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Return when there are no changes", async done => {
  const after = {
    data: (): Space.Response => spaceResponse,
  };
  const before = {
    data: (): Space.Response => spaceResponse,
  };
  const changes = {after, before};
  const context = {params: {spaceId: "spaceId"}};

  const wrapped = testEnv.wrap(activitySpaceUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalled();
  expect(db.collection).not.toHaveBeenCalled();
  done();
});

test("Invoke a request to add a new space to activities", async done => {
  const afterData: Space.Response = {
    ...spaceResponse,
    description: "new",
    photo: "new",
  };
  const beforeData: Space.Response = {
    ...spaceResponse,
    description: "old",
    photo: "old",
  };
  const after = {
    data: (): Space.Response => afterData,
  };
  const before = {
    data: (): Space.Response => beforeData,
  };

  const changes = {after, before};
  const context = {params: {spaceId: "spaceId"}};
  const expected: Activity.UpdateSpace = {
    ...activitySpaceResponseUpdated,
    action: "updated",
    category: "spaces",
    after: afterData,
    before: beforeData,
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activitySpaceUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(expected);
  done();
});
