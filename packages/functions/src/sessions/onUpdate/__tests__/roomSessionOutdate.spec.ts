import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {roomResponse} from "@sentrei/functions/__dummy__/Room";
import {
  memberSessionResponse,
  roomSessionResponse,
} from "@sentrei/functions/__dummy__/Session";
import Session from "@sentrei/types/models/Session";

import roomSessionOutdate from "../roomSessionOutdate";

const testEnv = functions();
const db = admin.firestore();

test("On member session connect, return false", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => memberSessionResponse});

  const snap = {
    after: {data: (): Session.Response => memberSessionResponse},
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(roomSessionOutdate);
  const req = await wrapped(snap, {params});

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("rooms/roomId");
  done();
});

test("On member session disconnect, return false", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => roomResponse});

  const disconnectedSessionResponse: Session.Response = {
    ...memberSessionResponse,
    status: "disconnected",
  };
  const snap = {
    after: {data: (): Session.Response => disconnectedSessionResponse},
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(roomSessionOutdate);
  const req = await wrapped(snap, {params});

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("rooms/roomId");
  done();
});

test("On room session connect, return false", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => roomResponse});

  const snap = {
    after: {data: (): Session.Response => roomSessionResponse},
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(roomSessionOutdate);
  const req = await wrapped(snap, {params});

  expect(req).toBe(false);
  expect(db.doc).not.toHaveBeenCalledWith("rooms/roomId");
  done();
});

test("On room session disconnect, delete sessionId to set a room's sessions", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");
  spyOn(db.doc(""), "get").and.returnValue({data: () => roomResponse});

  const disconnectedSessionResponse: Session.Response = {
    ...roomSessionResponse,
    status: "disconnected",
  };
  const snap = {
    after: {data: (): Session.Response => disconnectedSessionResponse},
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(roomSessionOutdate);
  const req = await wrapped(snap, {params});
  const expected = {
    sessionId: "",
  };

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId");
  expect(db.doc("").update).toHaveBeenCalledWith(expected);
  done();
});
