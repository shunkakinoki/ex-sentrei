import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {nameroom} from "@sentrei/functions/__dummy__/Nameroom";
import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import Room from "@sentrei/types/models/Room";

import nameroomRoomSet from "../nameroomRoomSet";

const testEnv = functions();
const db = admin.firestore();

test("On room create, update nameroom to set a room's nameroom", async done => {
  spyOn(db.doc(""), "set").and.returnValue("created");
  spyOn(db.doc(""), "get").and.returnValue({data: () => roomResponse});

  const params = {roomId: "roomId"};
  const snap = {
    data: (): Room.Response => roomResponse,
  };
  const wrapped = testEnv.wrap(nameroomRoomSet);
  const req = await wrapped(snap, {params});
  expect(req).toBe("created");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/namerooms/nameroomId");
  expect(db.doc("").set).toHaveBeenCalledWith(nameroom);
  done();
});
