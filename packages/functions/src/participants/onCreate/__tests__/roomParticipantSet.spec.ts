import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import Participant from "@sentrei/types/models/Participant";
import Room from "@sentrei/types/models/Room";

import roomParticipantSet from "../roomParticipantSet";

const testEnv = functions();
const db = admin.firestore();

test("On participant item create, set participants element", async done => {
  spyOn(db.doc(""), "update").and.returnValue("updated");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {roomId: "roomId"};
  const wrapped = testEnv.wrap(roomParticipantSet);
  const req = await wrapped(snap, {params});

  expect(req).toBe("updated");
  expect(db.doc).toHaveBeenCalledWith("rooms/roomId");
  expect(db.doc("").update).toHaveBeenCalledWith(<Room.AdminUpdate>(<unknown>{
    // @ts-ignore
    participants: "added: userId",
    participantCount: 1,
  }));
  done();
});
