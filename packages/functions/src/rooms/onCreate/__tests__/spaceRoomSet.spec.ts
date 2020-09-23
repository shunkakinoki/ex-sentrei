import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Room from "@sentrei/types/models/Room";

import spaceRoomSet from "../spaceRoomSet";

const testEnv = functions();
const db = admin.firestore();

test("On room create, update space to set a space's rooms", async done => {
  spyOn(db.doc(""), "set").and.returnValue("created");
  spyOn(db.doc(""), "get").and.returnValue({data: () => roomResponse});

  const snap = {
    data: (): Room.Response => roomResponse,
  };
  const params = {roomId: "roomId"};
  const wrapped = testEnv.wrap(spaceRoomSet);
  const req = await wrapped(snap, {params});

  expect(req).toBe("created");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/rooms/roomId");
  expect(db.doc("").set).toHaveBeenCalledWith(roomResponse);
  done();
});
