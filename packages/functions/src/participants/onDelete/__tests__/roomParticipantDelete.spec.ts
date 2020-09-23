import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import Participant from "@sentrei/types/models/Participant";
import Room from "@sentrei/types/models/Room";

import roomParticipantDelete from "../roomParticipantDelete";

const testEnv = functions();
const db = admin.firestore();

test("On participant item delete, delete participants element", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {roomId: "roomId"};
  const wrapped = testEnv.wrap(roomParticipantDelete);
  const req = await wrapped(snap, {params});

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Room.AdminUpdate>(<unknown>{
    participants: "removed: userId",
    participantCount: -1,
  }));
  done();
});
