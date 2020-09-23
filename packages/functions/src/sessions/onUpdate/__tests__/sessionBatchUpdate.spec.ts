import * as admin from "firebase-admin";
import functions from "firebase-functions-test";
import {when} from "jest-when";

import {memberSessionResponse} from "@sentrei/functions/__dummy__/Session";

import Session from "@sentrei/types/models/Session";

import sessionBatchUpdate from "../sessionBatchUpdate";

const testEnv = functions();
const db = admin.firestore();

test("Invoke a request to batch set the session document", async done => {
  spyOn(db.batch(), "commit").and.returnValue(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("rooms/roomId/sessions/sessionId")
    .mockReturnValue("roomRef");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when(db.doc as any)
    .calledWith("spaces/spaceId/sessions/sessionId")
    .mockReturnValue("spaceRef");

  const snap = {
    after: {data: (): Session.Response => memberSessionResponse},
  };
  const params = {sessionId: "sessionId"};
  const wrapped = testEnv.wrap(sessionBatchUpdate);
  const req = await wrapped(snap, {params});

  expect(req).toBe(true);
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId/sessions/sessionId");
  expect(db.doc).toHaveBeenCalledWith("spaces/spaceId/sessions/sessionId");
  expect(db.batch().update).toHaveBeenCalledWith(
    "roomRef",
    memberSessionResponse,
  );
  expect(db.batch().update).toHaveBeenCalledWith(
    "spaceRef",
    memberSessionResponse,
  );
  done();
});
