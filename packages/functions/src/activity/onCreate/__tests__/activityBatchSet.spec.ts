import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {
  activitySpaceResponseDeleted,
  activitySpaceResponseUpdated,
} from "@sentrei/functions/__dummy__/Activity";
import {profileGet} from "@sentrei/functions/__dummy__/Profile";

import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Activity from "@sentrei/types/models/Activity";
import Metadata from "@sentrei/types/models/Metadata";

import activityBatchSet from "../activityBatchSet";

const testEnv = functions();
const db = admin.firestore();

test("Do not invoke a request to update when an item was deleted", async done => {
  const snap = {
    data: (): Activity.DeleteSpace => activitySpaceResponseDeleted,
  };
  const wrapped = testEnv.wrap(activityBatchSet);
  const req = await wrapped(snap);

  expect(req).toBe(false);
  expect(db.batch).not.toHaveBeenCalled();
  done();
});

test("Invoke a request to update the updatedAt field", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId")
    .mockReturnValue("spaceRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/activity/activityId")
    .mockReturnValue("spaceActivityRef");

  const snap = {
    data: (): Activity.UpdateSpace => activitySpaceResponseUpdated,
  };
  const params = {activityId: "activityId"};
  const wrapped = testEnv.wrap(activityBatchSet);
  const req = await wrapped(snap, {params});
  const expected: Metadata.Update = {
    updatedAt: timestamp,
    updatedBy: profileGet,
    updatedByUid: "userId",
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/activity/activityId");
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", expected, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith(
    "spaceActivityRef",
    activitySpaceResponseUpdated,
  );
  done();
});
