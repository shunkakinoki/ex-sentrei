import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activitySpaceResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import Activity from "@sentrei/types/models/Activity";

import actionsRootSet from "../actionsRootSet";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add actions category", async done => {
  const snap = {
    data: (): Activity.UpdateSpace => activitySpaceResponseUpdated,
  };
  const params = {activityId: "activityId"};

  spyOn(db.doc(""), "set").and.returnValue(true);

  const wrapped = testEnv.wrap(actionsRootSet);
  const req = await wrapped(snap, {params});
  const actionsData = {
    updated_spaces: 1,
  };

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("admin/actions");
  expect(db.doc("").set).toHaveBeenCalledWith(actionsData, {
    merge: true,
  });
  done();
});
