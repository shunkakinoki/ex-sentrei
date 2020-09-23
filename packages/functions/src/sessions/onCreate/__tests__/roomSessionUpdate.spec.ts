import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {
  memberSessionResponse,
  roomSessionResponse,
} from "@sentrei/functions/__dummy__/Session";
import Session from "@sentrei/types/models/Session";

import roomSessionSet from "../roomSessionUpdate";

const testEnv = functions();
const db = admin.firestore();

test("On member session create, return false", async done => {
  spyOn(db.doc(""), "set").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => memberSessionResponse});

  const snap = {
    data: (): Session.Response => memberSessionResponse,
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(roomSessionSet);
  const req = await wrapped(snap, {params});

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("rooms/roomId");
  done();
});

test("On room session create, update sessionId to set a room's sessions", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => roomSessionResponse});

  const snap = {
    data: (): Session.Response => roomSessionResponse,
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(roomSessionSet);
  const req = await wrapped(snap, {params});
  const expected = {
    sessionId: "sessionId",
  };

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId");
  expect(db.doc("").update).toHaveBeenCalledWith(expected);
  done();
});
