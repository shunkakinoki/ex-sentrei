import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityRoomResponseUpdated} from "@sentrei/functions/__dummy__/Activity";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Activity from "@sentrei/types/models/Activity";
import Room from "@sentrei/types/models/Room";

import activityRoomUpdate from "../activityRoomUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Return when there are no changes", async done => {
  const after = {
    data: (): Room.Response => roomResponse,
  };
  const before = {
    data: (): Room.Response => roomResponse,
  };
  const changes = {after, before};
  const context = {params: {roomId: "roomId"}};

  const wrapped = testEnv.wrap(activityRoomUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalled();
  expect(db.collection).not.toHaveBeenCalled();
  done();
});

test("Invoke a request to add a new item to activities", async done => {
  const afterData: Room.Response = {
    ...roomResponse,
    description: "new",
  };
  const beforeData: Room.Response = {
    ...roomResponse,
    description: "old",
  };
  const after = {
    data: (): Room.Response => afterData,
  };
  const before = {
    data: (): Room.Response => beforeData,
  };

  const changes = {after, before};
  const context = {params: {roomId: "roomId"}};
  const expected: Activity.UpdateRoom = {
    ...activityRoomResponseUpdated,
    action: "updated",
    category: "rooms",
    after: afterData,
    before: beforeData,
  };

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityRoomUpdate);
  const req = await wrapped(changes, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(expected);
  done();
});
