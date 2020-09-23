import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import Participant from "@sentrei/types/models/Participant";

import spaceParticipantDelete from "../spaceParticipantDelete";

const testEnv = functions();
const db = admin.firestore();

test("On participant delete, update participants to set a space's participants", async done => {
  spyOn(db.doc(""), "delete").and.returnValue("deleted");

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {
    participantId: "participantId",
  };
  const wrapped = testEnv.wrap(spaceParticipantDelete);
  const req = await wrapped(snap, {params});

  expect(req).toBe("deleted");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/participants/participantId",
  );
  expect(db.doc("").delete).toHaveBeenCalledTimes(1);
  done();
});
