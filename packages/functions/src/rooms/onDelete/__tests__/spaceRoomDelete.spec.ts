import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Room from "@sentrei/types/models/Room";

import spaceRoomDelete from "../spaceRoomDelete";

const testEnv = functions();
const db = admin.firestore();

test("On room delete, update space to delete a space's rooms", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("deleted");

  const snap = {
    data: (): Room.Response => roomResponse,
  };
  const params = {roomId: "roomId"};
  const wrapped = testEnv.wrap(spaceRoomDelete);
  const req = await wrapped(snap, {params});

  expect(req).toBe("deleted");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/rooms/roomId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});
