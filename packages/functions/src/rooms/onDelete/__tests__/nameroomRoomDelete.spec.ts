import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Room from "@sentrei/types/models/Room";

import nameroomRoomDelete from "../nameroomRoomDelete";

const testEnv = functions();
const db = admin.firestore();

test("On room delete, update namespace to delete a room's nameroom", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("deleted");

  const params = {roomId: "roomId"};
  const snap = {
    data: (): Room.Response => roomResponse,
  };
  const wrapped = testEnv.wrap(nameroomRoomDelete);
  const req = await wrapped(snap, {params});

  expect(req).toBe("deleted");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/namerooms/nameroomId");
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});
