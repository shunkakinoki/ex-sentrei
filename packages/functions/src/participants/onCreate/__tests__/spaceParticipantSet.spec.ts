import * as admin from "firebase-admin";
import functions from "firebase-functions-test";

import {participantResponse} from "@sentrei/functions/__dummy__/Participant";
import Participant from "@sentrei/types/models/Participant";

import spaceParticipantSet from "../spaceParticipantSet";

const testEnv = functions();
const db = admin.firestore();

test("On particiapnt create, update space to set a space's participant", async done => {
  spyOn(db.doc(""), "set").and.returnValue("created");
  spyOn(db.doc(""), "get").and.returnValue({data: () => participantResponse});

  const snap = {
    data: (): Participant.Response => participantResponse,
  };
  const params = {
    participantId: "participantId",
  };
  const wrapped = testEnv.wrap(spaceParticipantSet);
  const req = await wrapped(snap, {params});

  expect(req).toBe("created");
  expect(db.doc).toHaveBeenCalledWith(
    "spaces/spaceId/participants/participantId",
  );
  expect(db.doc("").set).toHaveBeenCalledWith(participantResponse);
  done();
});
