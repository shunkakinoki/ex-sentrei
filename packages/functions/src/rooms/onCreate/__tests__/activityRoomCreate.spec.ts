import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {activityRoomResponseCreated} from "@sentrei/functions/__dummy__/Activity";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Room from "@sentrei/types/models/Room";

import activityRoomCreate from "../activityRoomCreate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to add a new room to activities", async done => {
  const snap = {
    data: (): Room.Response => roomResponse,
  };
  const context = {params: {roomId: "roomId"}};

  spyOn(db.collection(""), "add").and.returnValue(true);

  const wrapped = testEnv.wrap(activityRoomCreate);
  const req = await wrapped(snap, context);

  expect(req).toBe(true);
  expect(db.collection).toHaveBeenCalledWith("activity");
  expect(db.collection("").add).toHaveBeenCalledWith(
    activityRoomResponseCreated,
  );
  done();
});
