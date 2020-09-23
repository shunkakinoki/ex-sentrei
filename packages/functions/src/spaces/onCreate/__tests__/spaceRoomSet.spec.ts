import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import {spaceResponse} from "@sentrei/functions/__dummy__/Space";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";

import spaceRoomSet from "../spaceRoomSet";

const testEnv = functions();
const db = admin.firestore();

test("On spaces create, add room to space", async done => {
  spyOn(db.collection(""), "add").and.returnValue("updated");

  const snap = {
    data: (): Space.Response => spaceResponse,
  };
  const params = {
    spaceId: "spaceId",
  };
  const wrapped = testEnv.wrap(spaceRoomSet);
  const req = await wrapped(snap, {params});
  const expected: Room.Create = {
    ...roomResponse,
    name: "space",
    nameroomId: "namespaceId",
  };

  expect(req).toBe("updated");
  expect(db.collection).toHaveBeenCalledWith("rooms");
  expect(db.collection("").add).toHaveBeenCalledWith(expected);
  done();
});
