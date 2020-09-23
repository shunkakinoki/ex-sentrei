import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {activitySpaceResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import Activity from "@sentrei/types/models/Activity";

import actionsBatchSet from "../actionsBatchSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add actions category", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("users/userId/admin/actions")
    .mockReturnValue("actionsRef");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/admin/actions")
    .mockReturnValue("spaceRef");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/members/userId/admin/actions")
    .mockReturnValue("spaceActionsRef");

  const snap = {
    data: (): Activity.UpdateSpace => activitySpaceResponseUpdated,
  };
  const params = {activityId: "activityId"};
  const wrapped = testEnv.wrap(actionsBatchSet);
  const req = await wrapped(snap, {params});
  const actionsData = {
    updated_spaces: 1,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("users/userId/admin/actions");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/admin/actions");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/members/userId/admin/actions",
  );
  expect(db.batch().set).toHaveBeenCalledWith("actionsRef", actionsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("spaceRef", actionsData, {
    merge: true,
  });
  expect(db.batch().set).toHaveBeenCalledWith("spaceActionsRef", actionsData, {
    merge: true,
  });
  done();
});
